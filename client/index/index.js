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

          let generateInfoWindow = (content) => {
            let infowindow = new google.maps.InfoWindow({
              content: content
            });
            return infowindow;
          }
          
          stashInfo = [];

          marker.addListener('mouseover', function(event) {
            let info = generateInfoWindow("test");
            stashInfo.push(info);
            info.open(map.instance, marker);

            let lat = marker.internalPosition.lat();
            let long = marker.internalPosition.lng();
           
            let elevator = new google.maps.ElevationService;
            elevator.getElevationForLocations({
              "locations": [new google.maps.LatLng(lat, long)]
            }, function(results, status) {
              console.log(results[0].elevation, status);
            })
          });

          marker.addListener('mouseout', function() {
            let info = stashInfo.shift();
            info.close(map.instance, marker);
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
        zoom: 8
      }
    }
  }
});

// Template.index.events({
//   'click '
// });