Router.route('/', {
	template: "index",
  name: "index",
	layoutTemplate: "applicationLayout",
  loadingTemplate: "loading"
});

Router.route('/advisor', {
  template: "advisor",
  name: "advisor",
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
    Router.go('/login');
  } 
  this.next();
}, { only: ['login', 'index', 'advisor'] })

Router.onBeforeAction(function() {
  if (Meteor.user()) {
    Router.go('/advisor')
  } else {
    //
  }
  this.next();
}, { only: ['login'] })