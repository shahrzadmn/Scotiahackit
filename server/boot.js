// init fb

Meteor.startup(function() {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: Meteor.settings.facebook.appId,
    secret: Meteor.settings.facebook.secret
  });

  // seed data

  if (Homes.find().count() == 0) {    
    _.each(_.range(100), function(element, index) {
      let randomLat = Number(43 + "." + (_.random(0, 999999)));
      let randomLng = Number(-80 + "." + (_.random(0, 999999)));

      Homes.insert({
        lat: randomLat,
        lng: randomLng
      });
    });

    _.each(_.range(10), function(element, index) {
      let randomLat = Number(44 + "." + (_.random(0, 999999)));
      let randomLng = Number(-79 + "." + (_.random(0, 999999)));

      Homes.insert({
        lat: randomLat,
        lng: randomLng
      });
    });

    _.each(_.range(200), function(element, index) {
      let randomLat = Number(43 + "." + (_.random(0, 999999)));
      let randomLng = Number(-79 + "." + (_.random(0, 999999)));

      Homes.insert({
        lat: randomLat,
        lng: randomLng
      });
    });

    _.each(_.range(50), function(element, index) {
      let randomLat = Number(43 + "." + (_.random(0, 999999)));
      let randomLng = Number(-78 + "." + (_.random(0, 999999)));

      Homes.insert({
        lat: randomLat,
        lng: randomLng
      });
    });
  }
})

// get fb profile pic

Accounts.onCreateUser(function(options, user) {
  options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  user.profile = options.profile;
  return user;    
});