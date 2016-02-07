Template.index.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {

    if (Meteor.user() && Meteor.user().profile.existingProperty) {
      let existingProperty = Meteor.user().profile.existingProperty;
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ "address": existingProperty.address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          let marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: GoogleMaps.maps.map.instance,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          });
          marker.setAnimation(google.maps.Animation.DROP);

          marker.addListener('click', function(event) {
            $('#modal').html(`<div id="updateExistingPropertyModal" class="ui small modal">
              <div class="header">
                <i class="blue huge home icon"></i>
                Update Existing Property & Financials
              </div>
              <div class="home--description">
                <div class="ui form">
                  <div class="field">
                    <label>Address</label>
                    <input value="${existingProperty.address}" id="update--address" type="text" placeholder="123 Main St.">
                  </div>
                  <div class="two fields">
                    <div class="field">
                      <label>Monthly Payment</label>
                      <input value="${existingProperty.monthlyPayment}" id="update--monthly-payment" type="number" placeholder="1500">
                    </div>
                    <div class="field">
                      <label>Remaining Mortgage Years</label>
                      <input value="${existingProperty.remainingYears}" id="update--remaining" type="number" placeholder="10">
                    </div>
                  </div>
                  <div class="three fields">
                    <div class="field">
                      <label>Property Tax</label>
                      <input value="${existingProperty.propertyTax}" id="update--property-tax" type="number" placeholder="2000">
                    </div>
                    <div class="field">
                      <label>Utilities</label>
                      <input value="${existingProperty.utilities}" id="update--utilities" type="number" placeholder="100">
                    </div>
                    <div class="field">
                      <label>Condominum Fees (if applicable)</label>
                      <input value="${existingProperty.condoFees}" id="update--condo-fees" type="number" placeholder="0">
                    </div>
                  </div>
                  <div class="three fields">
                    <div class="field">
                      <label>Remaining Mortgage Principal</label>
                      <input value="${existingProperty.remainingMortgagePrincipal}" id="update--mortgage-principal" type="number" placeholder="120000">
                    </div>
                    <div class="field">
                      <label>Contract Type</label>
                      <select id="update--contract-type" class="ui dropdown">
                        <option id="update--frequency"></option>
                        <option value="6 Month Closed">6 Month Closed</option>
                        <option value="6 Month Open">6 Month Open</option>
                        <option value="1 Year Open">1 Year Open</option>
                        <option value="1 Year Closed">1 Year Closed</option>
                        <option value="2 Year Closed">2 Year Closed</option>
                        <option value="3 Year Closed">3 Year Closed</option>
                        <option value="4 Year Closed">4 Year Closed</option>
                        <option value="5 Year Closed">5 Year Closed</option>
                        <option value="7 Year Closed">7 Year Closed</option>
                        <option value="10 Year Closed">10 Year Closed</option>
                        <option value="5 Year VRM">5 Year VRM</option>
                      </select>
                    </div>
                    <div class="field">
                      <label>Interest Rate</label>
                      <input value="${existingProperty.currentInterestRate}" id="update--interest-rate" type="number" placeholder="2.2%">
                    </div>
                  </div>
                  <div class="field">
                    <div class="actions">
                      <div class="ui approve button">Update</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`);
            $('#updateExistingPropertyModal').modal('show');
            $('#updateExistingPropertyModal').modal('setting', {
                'onApprove': function() {
                  var existing = {
                    address: $('#update--address').val(),
                    propertyTax: $('#update--property-tax').val(),
                    utilities: $('#update--utilities').val(),
                    condoFees: $('#update--condo-fees').val(),
                    remainingMortgagePrincipal: $('#update--mortgage-principal').val(),
                    contractType: $('#update--contract-type').val(),
                    currentInterestRate: $('#update--interest-rate').val(),
                    monthlyPayment: $('#update--monthly-payment').val(),
                    remainingYears: $('#update--remaining').val()
                  }
                  console.log(existing);
                  Meteor.call('updateExistingProperty', existing, Meteor.userId(), function(err, res) {
                    if (!err) {
                      console.log(res);
                      toastr["info"]("Updated your existing property & financials!");
                    }
                  })
                }
              });
            // let existing = {
            //   address: $('#existing--address').val(),
            //   propertyTax: $('#existing--property-tax').val(),
            //   utilities: $('#existing--utilities').val(),
            //   condoFees: $('#existing--condo-fees').val(),
            //   remainingMortgagePrincipal: $('#existing--mortgage-principal').val(),
            //   contractType: $('#contract-type').next().find('.text').text(),
            //   currentInterestRate: $('#existing--interest-rate').val(),
            //   monthlyPayment: $('#existing--monthly-payment').val(),
            //   remainingYears: $('#existing--remaining').val()
            // }
            // Meteor.call('updateExistingProperty', existing, function(err, res) {
            //   if (!err) {
            //     toastr["info"]("Updated your existing property & financials!");
            //   }
            // })
          });
        }
      });
    }

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
              marker.setAnimation(google.maps.Animation.DROP);

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

              marker.addListener('click', function() {
              $('#modal').html(`<div id="modal-dynamic" class="ui small modal">
                  <div class="header">
                    <i class="red huge home icon"></i>
                    Home Details
                  </div>
                  <div class="description">
                    <div class="home--description">
                       <div class="home--details">For Sale Price: <span>${accounting.formatMoney(value.price)}</span></div> 
                       <div class="home--details">5% Down Payment: <span>${accounting.formatMoney(value.price * 0.05)}</span></div>
                    </div>
                  </div>
                </div>`);
                $('#modal-dynamic').modal('show'); 
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

  $('#updateExistingProperty').click(function() {
    console.log('halp');
  })
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

var expenses = function() {
    let exps = Meteor.user().profile.expenses;
    let expenses = 0;
    _.each(exps, function(value, key) {
      expenses += Number(value);
    });
    return expenses;
  }

function configureSliders(user, parentTemplate) {
    // salary
    let salarySlider = parentTemplate.find($('#salary'));
    let salaryValue = parentTemplate.find($('#salary--value'));

    $(salarySlider).val(user.profile.basicSettings.salary);
    $(salaryValue).val(user.profile.basicSettings.salary);

    $(salarySlider).on('input change', function(event) {
      $(salaryValue).val($(salarySlider).val());
    });
    $(salaryValue).on('input change', function(event) {
      $(salarySlider).val($(salaryValue).val());
    });

    // savings
    let savingsSlider = parentTemplate.find($('#savings'));
    let savingsValue = parentTemplate.find($('#savings--value'));

    $(savingsSlider).val(user.profile.basicSettings.savings);
    $(savingsValue).val(user.profile.basicSettings.savings);

    $(savingsSlider).on('input change', function(event) {
      $(savingsValue).val($(savingsSlider).val());
    });
    $(savingsValue).on('input change', function(event) {
      $(savingsSlider).val($(savingsValue).val());
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

    console.log('ex', expenses());

    $(expensesSlider).val(expenses());
    $(expensesValue).val(expenses());

    $(expensesSlider).on('input change', function(event) {
      $(expensesValue).val($(expensesSlider).val());
    });
    $(expensesValue).on('input change', function(event) {
      $(expensesSlider).val($(expensesValue).val());
    });

    // amortization
    let amortizationSlider = parentTemplate.find($('#amortization'));
    let amortizationValue = parentTemplate.find($('#amortization--value'));

    if (user.profile.advancedSettings) {
      $(amortizationSlider).val(user.profile.advancedSettings.amortization);
      $(amortizationValue).val(user.profile.advancedSettings.amortization);
    } else {
      $(amortizationSlider).val(25);
      $(amortizationValue).val(25);  
    }

    $(amortizationSlider).on('input change', function(event) {
      $(amortizationValue).val($(amortizationSlider).val());
    });
    $(amortizationValue).on('input change', function(event) {
      $(amortizationSlider).val($(amortizationValue).val());
    });

    // interest rate 
    let interestRateDropdown = parentTemplate.find($('#interest-rate'));
    
    if (user.profile.advancedSettings && user.profile.advancedSettings.interestRate) {
      let advanced = user.profile.advancedSettings;
      $(interestRateDropdown).html(`${advanced.interestTerm} <span class="rate--value">${advanced.interestRate}</span>`);
    }
  }

  let generateInfoWindow = (content) => {
    let infowindow = new google.maps.InfoWindow({
      content: `
        <div class="ui relaxed divided list">
          <div class="item">
            <i class="ib large home icon"></i>
            <div class="ib">
              Home Details
            </div>
          </div>
          <div class="item">
            <i class="large dollar middle aligned icon"></i>
            <div class="content">
              <a class="header">Price</a>
              <div class="description">${content.price}</div>
            </div>
          </div>
          <div class="item">
            <i class="large world middle aligned icon"></i>
            <div class="content">
              <a class="header">Lat/Lng</a>
              <div class="description">${content.lat} / ${content.lng}</div>
            </div>
          </div>
        </div> 
      `
    });
    return infowindow;
  }