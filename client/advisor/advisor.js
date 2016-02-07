Template.advisor.onRendered(function() {
  $('.ui.accordion').accordion();
});

Template.advisor.helpers({
  'totalExpenses': () => {
    let exps = Meteor.user().profile.expenses;
    let expenses = 0;
    _.each(exps, function(value, key) {
      expenses += value;
    });
    return expenses;
  },
  'expenses': () => {
    let exps = Meteor.user().profile.expenses;
    let expenses = {};
    _.each(exps, function(value, key) {
      expenses[key] = value;
    });
    return expenses;
  }
});

Template.advisor.events({
  'change input[type="number"]': (event) => {
    let value = $(event.target).val();
    let id = $(event.target).attr("id");

    Meteor.call('updateExpense', value, id, Meteor.userId(), function(err, res) {
      if (!err) {
        console.log(res);
      }
    });
  }
})