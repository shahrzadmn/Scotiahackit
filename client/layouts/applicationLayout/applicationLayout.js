Template.applicationLayout.events({
  'click #menu--button': (event) => {
    $('.ui.sidebar').sidebar('toggle');
  }
})