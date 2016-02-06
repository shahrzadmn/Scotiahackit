Meteor.publish("homes", function() {
  return Homes.find({})
});