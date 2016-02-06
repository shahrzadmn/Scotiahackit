Meteor.methods({
  'getHomes': function() {
    return Homes.find({}).fetch()
  },
  'saveBasicSettings': function(settings, userId) {
    Meteor.users.update(userId, {
      $set: {
        "profile.basicSettings": settings
      }
    });
    return true;
  },
  'saveAdvancedSettings': function(settings, userId) {
    Meteor.users.update(userId, {
      $set: {
        "profile.advancedSettings": settings
      }
    });
    return true;
  }
});