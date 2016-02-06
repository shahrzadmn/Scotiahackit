Meteor.startup(function() {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: Meteor.settings.facebook.appId,
    secret: Meteor.settings.facebook.secret
  });

  if (Homes.find().count() == 0) {    
    _.each(_.range(250), function(element, index) {

      let randomLat = Number(43 + "." + (_.random(0, 999999)));
      let randomLng = Number(-80 + "." + (_.random(0, 999999)));

      //console.log(element, randomLat, randomLng);

      Homes.insert({
        lat: randomLat,
        lng: randomLng
      });
    });
  }

})