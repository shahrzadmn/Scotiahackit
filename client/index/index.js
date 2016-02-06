Template.index.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    Meteor.call('getHomes', function(err, res) {
      if (!err) {
        $.each(res, function(index, value) {
          let marker = new google.maps.Marker({
            position: { lat: value.lat, lng: value.lng },
            map: map.instance
          });

          let infowindow = new google.maps.InfoWindow({
            content: "test"
          });

          marker.addListener('mouseover', function() {
            infowindow.open(map.instance, marker)
          });

          marker.addListener('mouseout', function() {
            infowindow.close(map.instance, marker)
          });

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

// Template.index.events({
//   'click '
// });