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
  },
  'submitExistingProperty': function(existing, userId) {
    Meteor.users.update(userId, {
      $set: {
        "profile.existingProperty": existing
      }
    });
    return true;
  },
  'updateExistingProperty': function(existing, userId) {
    return Meteor.users.update(userId, {
      $set: {
        "profile.existingProperty": existing
      }
    });
  },
  'updateExpense': (value, id, userId) => {
    let key = `profile.expenses.${id}`;
    let update = {
      $set: {}
    }
    update.$set[key] = value;
    
    return Meteor.users.update(userId, update);
  }
});