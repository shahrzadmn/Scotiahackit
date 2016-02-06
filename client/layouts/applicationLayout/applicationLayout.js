Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  $('.ui.dropdown').dropdown();
  
  let salarySlider = $('#salary');
  let salaryValue = $('#salary--value');

  salarySlider.on('input change', function(event) {
    salaryValue.html("$" + salarySlider.val());
  });

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
      }
      // ,
      // "1 Year Closed": 2.99,
      // "2 Year Closed": 2.84,
      // "3 Year Closed": 3.39,
      // "4 Year Closed": 3.89,
      // "5 Year Closed": 4.64,
      // "6 Year Closed": 5.14,
      // "7 Year Closed": 5.3,
      // "10 Year Closed": 6.1
    ]
  },
  "variableRateMortgage": () => {
    return {
      "5 Year Open": 3.7,
      "5 Year Closed": 2.6
    }
  }
})
