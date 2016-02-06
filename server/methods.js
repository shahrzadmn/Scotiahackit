Meteor.methods({
  'getHomes': function() {
    console.log('about to return homes...');
    return Homes.find({}).fetch()
  }
});