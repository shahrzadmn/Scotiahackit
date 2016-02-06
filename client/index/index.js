Template.index.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    // new google.maps.Marker({
    //   position: map.options.center,
    //   map: map.instance
    // });

    // new google.maps.Marker({
    //   position: { lat: 43.688732,  lng: -79.409166 },
    //   map: map.instance
    // });
    Meteor.call('getHomes', function(err, res) {
      if (!err) {
        $.each(res, function(index, value) {
          // console.log(index, value.lat, value.lng);
          let marker = new google.maps.Marker({
            position: { lat: value.lat, lng: value.lng },
            map: map.instance
          })
        })
      }
    });
  });
});

Template.index.onRendered(function() {
  GoogleMaps.load();
});

Template.index.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(43.652663, -80.381825),
        zoom: 10
      }
    }
  }
});