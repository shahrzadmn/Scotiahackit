Template.applicationLayout.onRendered(function() {
  $('.ui.sidebar').sidebar();
  
  let salarySlider = $('#salary');
  let salaryValue = $('#salary--value');

  salarySlider.on('input change', function(event) {
    //console.log(salarySlider.val());
    salaryValue.html(salarySlider.val())
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

