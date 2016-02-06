Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  
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

