Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  $('.ui.dropdown').dropdown();
  $('.ui.accordion').accordion();
  configureSliders();  

});

Template.applicationLayout.events({
  'click #menu--button': (event) => {
    $('.ui.sidebar').sidebar('toggle');
  },
  'click [role="logout"]': (event) => {
    AccountsTemplates.logout();
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


function configureSliders() {
  // salary
  let salarySlider = $('#salary');
  let salaryValue = $('#salary--value');

  salarySlider.on('input change', function(event) {
    salaryValue.html("$" + salarySlider.val());
  }); 

  // debt
  let debtSlider = $('#debt');
  let debtValue = $('#debt--value');

  debtSlider.on('input change', function(event) {
    debtValue.html("$" + debtSlider.val());
  }); 

  // expenses
  let expensesSlider = $('#expenses');
  let expensesValue = $('#expenses--value');

  expensesSlider.on('input change', function(event) {
    expensesValue.html("$" + expensesSlider.val());
  });

  // amortization
  let amortizationSlider = $('#amortization');
  let amortizationValue = $('#amortization--value');

  amortizationSlider.on('input change', function(event) {
    amortizationValue.html(amortizationSlider.val() + " years");
  });


}