Meteor.methods({
  'getHomes': function() {
    return Homes.find({}).fetch()
  }
});