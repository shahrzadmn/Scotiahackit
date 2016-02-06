Router.route('/', {
	template: "index",
  name: "index",
	layoutTemplate: "applicationLayout",
  loadingTemplate: "loading"
});

Router.route('/login', {
  template: "login",
  layoutTemplate: "defaultLayout",
  name: "login"
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    Router.go('login');
  } else {
    Router.go('index');
  }
  this.next();
});