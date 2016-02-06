Router.route('/', {
	template: "index",
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
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
  this.next();
});