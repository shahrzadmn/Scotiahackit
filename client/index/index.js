Template.index.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    Meteor.call('getHomes', function(err, res) {
      if (!err) {

        let elevator = new google.maps.ElevationService;
        stashInfo = [];

        $.each(res, function(index, value) {

          elevator.getElevationForLocations({
            "locations": [{ lat: value.lat, lng: value.lng }],
          }, function(results, status) {
            let checkWater = results[0].elevation;

            if (checkWater > 67) {
              let marker = new google.maps.Marker({
                position: { lat: value.lat, lng: value.lng },
                map: map.instance
              });

              let generateInfoWindow = (content) => {
                let infowindow = new google.maps.InfoWindow({
                  content: `${content.elevation} | ${content.lat} | ${content.lng} | ${content.price}`
                });
                return infowindow;
              }

              marker.addListener('mouseover', function(event) {
                let lat = marker.internalPosition.lat();
                let long = marker.internalPosition.lng();
                
                elevator.getElevationForLocations({
                  "locations": [new google.maps.LatLng(lat, long)]
                }, function(results, status) {
                  let info = generateInfoWindow({
                    elevation: (results[0].elevation).toString(),
                    lat: lat,
                    lng: long,
                    price: value.price
                  });
                  stashInfo.push(info);
                  info.open(map.instance, marker);
                })
              });

              marker.addListener('mouseout', function() {
                let info = stashInfo.shift();
                info.close(map.instance, marker);
              });  
            }

          })
        })
      }
    });
  });
});

Template.index.onRendered(function() {
  GoogleMaps.load();
  let parentTemplate = this.parentTemplate();
  configureSliders(Meteor.user(), parentTemplate);
});

Template.index.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(43.652663, -79.381825),
        zoom: 10
      }
    }
  }
});

function configureSliders(user, parentTemplate) {
    // salary
    let salarySlider = parentTemplate.find($('#salary'));
    let salaryValue = parentTemplate.find($('#salary--value'));

    //console.log(parentTemplate, salarySlider);

    $(salarySlider).val(user.profile.basicSettings.salary);
    $(salaryValue).val(user.profile.basicSettings.salary);

    $(salarySlider).on('input change', function(event) {
      $(salaryValue).val($(salarySlider).val());
    });
    $(salaryValue).on('input change', function(event) {
      $(salarySlider).val($(salaryValue).val());
    });

    // debt
    let debtSlider = parentTemplate.find($('#debt'));
    let debtValue = parentTemplate.find($('#debt--value'));

    $(debtSlider).val(user.profile.basicSettings.debt);
    $(debtValue).val(user.profile.basicSettings.debt);

    $(debtSlider).on('input change', function(event) {
      $(debtValue).val($(debtSlider).val());
    }); 

    $(debtValue).on('input change', function(event) {
      $(debtSlider).val($(debtValue).val());
    });

    // expenses
    let expensesSlider = parentTemplate.find($('#expenses'));
    let expensesValue = parentTemplate.find($('#expenses--value'));

    $(expensesSlider).val(user.profile.basicSettings.expenses);
    $(expensesValue).val(user.profile.basicSettings.expenses);

    $(expensesSlider).on('input change', function(event) {
      $(expensesValue).val($(expensesSlider).val());
    });
    $(expensesValue).on('input change', function(event) {
      $(expensesSlider).val($(expensesValue).val());
    });

    // amortization
    let amortizationSlider = parentTemplate.find($('#amortization'));
    let amortizationValue = parentTemplate.find($('#amortization--value'));

    $(amortizationSlider).val(user.profile.advancedSettings.amortization || 25);
    $(amortizationValue).val(user.profile.advancedSettings.amortization || 25);

    $(amortizationSlider).on('input change', function(event) {
      $(amortizationValue).val($(amortizationSlider).val());
    });
    $(amortizationValue).on('input change', function(event) {
      $(amortizationSlider).val($(amortizationValue).val());
    }); 
    
  }