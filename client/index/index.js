Template.index.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    Meteor.call('getHomes', function(err, res) {
      if (!err) {

        let elevator = new google.maps.ElevationService;
        stashInfo = [];

        $.each(res, function(index, value) {

          elevator.getElevationForLocations({
            "locations": [{ lat: value.lat, lng: value.lng }],
          }, function(results, status) {
            let checkWater = results[0].elevation;

            if (checkWater > 0) {
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

              marker.addListener('mouseover', function(event) {
                let lat = marker.internalPosition.lat();
                let long = marker.internalPosition.lng();
                
                elevator.getElevationForLocations({
                  "locations": [new google.maps.LatLng(lat, long)]
                }, function(results, status) {
                  let info = generateInfoWindow((results[0].elevation).toString());
                  stashInfo.push(info);
                  info.open(map.instance, marker);
                })
              });

              marker.addListener('mouseout', function() {
                let info = stashInfo.shift();
                info.close(map.instance, marker);
              });  
            }

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
        zoom: 8
      }
    }
  }
});

// Template.index.events({
//   'click '
// });