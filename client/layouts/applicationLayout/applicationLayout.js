Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  $('.ui.dropdown').dropdown();
  $('.ui.accordion').accordion();

  $('#submitExistingProperty').on('click', function(event) {
    let existing = {
      address: $('#existing--address').val(),
      propertyTax: $('#existing--property-tax').val(),
      utilities: $('#existing--utilities').val(),
      condoFees: $('#existing--condo-fees').val(),
      remainingMortgagePrincipal: $('#existing--mortgage-principal').val(),
      contractType: $('#contract-type').next().find('.text').text(),
      currentInterestRate: $('#existing--interest-rate').val(),
      monthlyPayment: $('#existing--monthly-payment').val(),
      remainingYears: $('#existing--remaining').val()
    }
    Meteor.call('submitExistingProperty', existing, Meteor.userId(), function(err, res) {
      if (!err) {
        $('#existingPropertyModal').modal('hide');
        toastr["success"]("Saved your existing property!");

        GoogleMaps.ready('map', function(map) {
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ "address": existing.address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              let latitude = results[0].geometry.location.lat();
              let longitude = results[0].geometry.location.lng();
              let marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: GoogleMaps.maps.map.instance,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              });
              marker.setAnimation(google.maps.Animation.DROP);
            }
          });
        });
      }
    });
  });
});

Template.applicationLayout.events({
  'click #menu--button': (event) => {
    $('.ui.sidebar').sidebar('toggle');
  },
  'click [role="logout"]': (event) => {
    AccountsTemplates.logout();
  },
  'click #submitBasicSettings': (event) => {
    let salary = $('#salary').val();
    let savings = $('#savings').val();
    let debt = $('#debt').val();
    let expenses = $('#expenses').val();
    let monthlyMortgagePaymentCap = Math.floor(((salary / 12) - expenses));

    let settings = {
      salary,
      savings,
      debt,
      expenses,
      monthlyMortgagePaymentCap
    }

    Meteor.call('saveBasicSettings', settings, Meteor.userId(), function(err, res) {
      if (!err) {
        toastr["info"]("Saved your basic settings!")
      }
    })
  },
  'click #submitAdvancedSettings': (event) => {
    let settings = {
      amortization: $('#amortization').val(),
      interestTerm: $('#interest-rate')
        .clone()
        .children()
        .remove()
        .end()
        .text(),
      interestRate: $('#interest-rate')
        .find('span') 
        .text()
    }

    Meteor.call('saveAdvancedSettings', settings, Meteor.userId(), function(err, res) {
      if (!err) {
        toastr["success"]("Saved your advanced settings!")
      }
    })
  },
  'click #addExistingPropertyButton': (event) => {
    $('#existingPropertyModal').modal('show');
  }
})

Template.applicationLayout.helpers({
  "fixedRateMortgage": () => {
    return [
      { 
        "key": "1 Year Open",
        "value": 6.3
      },
      { 
        "key": "1 Year Closed",
        "value": 2.99
      },
      { 
        "key": "2 Year Closed",
        "value": 2.84
      },
      { 
        "key": "3 Year Closed",
        "value": 3.39
      },
      { 
        "key": "4 Year Closed",
        "value": 3.89
      },
      { 
        "key": "5 Year Closed",
        "value": 4.64
      },
      { 
        "key": "6 Year Closed",
        "value": 5.14
      },
      { 
        "key": "7 Year Closed",
        "value": 5.3
      },
      { 
        "key": "10 Year Closed",
        "value": 6.1
      }
    ]
  },
  "variableRateMortgage": () => {
    return [
      { 
        "key": "5 Year Open",
        "value": 3.7
      },
      { 
        "key": "5 Year Closed",
        "value": 2.6
      }
    ]
  }
})


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}