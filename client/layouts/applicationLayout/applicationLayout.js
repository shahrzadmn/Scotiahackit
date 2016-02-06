Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  $('.ui.dropdown').dropdown();
  $('.ui.accordion').accordion();
  configureSliders(Meteor.user());
});

Template.applicationLayout.events({
  'click #menu--button': (event) => {
    $('.ui.sidebar').sidebar('toggle');
  },
  'click [role="logout"]': (event) => {
    AccountsTemplates.logout();
  },
  'click #submitBasicSettings': (event) => {
    let settings = {
      salary: $('#salary').val(),
      debt: $('#debt').val(),
      expenses: $('#expenses').val()
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
      interestRate: $('#interest-rate').text()
    }

    Meteor.call('saveAdvancedSettings', settings, Meteor.userId(), function(err, res) {
      if (!err) {
        toastr["success"]("Saved your advanced settings!")
      }
    })
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


function configureSliders(user) {
  // salary
  let salarySlider = $('#salary');
  let salaryValue = $('#salary--value');

  salarySlider.on('input change', function(event) {
    salaryValue.val(salarySlider.val());
  }); 

  salarySlider.val(user.profile.basicSettings.salary);
  salaryValue.val(user.profile.basicSettings.salary);

  // debt
  let debtSlider = $('#debt');
  let debtValue = $('#debt--value');

  debtSlider.on('input change', function(event) {
    debtValue.val(debtSlider.val());
  }); 

  debtSlider.val(user.profile.basicSettings.debt);
  debtValue.val(user.profile.basicSettings.debt);

  // expenses
  let expensesSlider = $('#expenses');
  let expensesValue = $('#expenses--value');

  expensesSlider.on('input change', function(event) {
    expensesValue.val(expensesSlider.val());
  });

  expensesSlider.val(user.profile.basicSettings.expenses);
  expensesValue.val(user.profile.basicSettings.expenses);

  // amortization
  let amortizationSlider = $('#amortization');
  let amortizationValue = $('#amortization--value');

  amortizationSlider.on('input change', function(event) {
    amortizationValue.html(amortizationSlider.val() + " years");
  });

  // common event handler for all sliders
  // $(document).on('input change', [salarySlider, debtSlider, expensesSlider], function(event) {
  //   let salary = salarySlider.val();
  //   let debt = debtSlider.val();
  //   let expenses = expensesSlider.val();
  //   console.log(salary, debt, expenses);
  // });
}

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