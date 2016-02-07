Template.advisor.onRendered(function() {
  $('.ui.accordion').accordion();
  regen(Meteor.user());
});

Template.advisor.helpers({
  'totalExpenses': () => {
    let exps = Meteor.user().profile.expenses;
    let expenses = 0;
    _.each(exps, function(value, key) {
      expenses += Number(value);
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
        regen(Meteor.user());
      }
    });
  }
})

function regen(user) {
    //Donut chart example
    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true)     //Display pie labels
            .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
            .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
            .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
            .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
            ;

          d3.select("#chart2 svg")
              .datum(exampleData(user))
              .transition().duration(350)
              .call(chart);

        return chart;
    });
    //Pie chart example data. Note how there is only a single array of key-value pairs.
    function exampleData(user) {
      return  [
          { 
            "label": "Food & Dining",
            "value" : user.profile.expenses.foodAndDining
          }, 
          { 
            "label": "Bills & Utilities",
            "value" : (user.profile.expenses.billsAndUtilities).toString()
          } , 
          { 
            "label": "Auto & Transportation",
            "value" : (user.profile.expenses.autoAndTransportation).toString()
          } , 
          { 
            "label": "Business & Servies",
            "value" : (user.profile.expenses.businessAndServices).toString()
          } , 
          { 
            "label": "Education",
            "value" : (user.profile.expenses.education).toString()
          } , 
          { 
            "label": "Entertainment",
            "value" : (user.profile.expenses.entertainment).toString()
          } , 
          { 
            "label": "Fees & Charges",
            "value" : (user.profile.expenses.feesAndCharges).toString()
          } , 
          { 
            "label": "Gifts & Donations",
            "value" : (user.profile.expenses.giftsAndDonations).toString()
          },
          { 
            "label": "Health",
            "value" : (user.profile.expenses.health).toString()
          },
          { 
            "label": "fitness",
            "value" : (user.profile.expenses.fitness).toString()
          },
          { 
            "label": "Household",
            "value" : (user.profile.expenses.household).toString()
          },
          { 
            "label": "Kids",
            "value" : (user.profile.expenses.kids).toString()
          },
          { 
            "label": "Loans",
            "value" : (user.profile.expenses.loans).toString()
          },
          { 
            "label": "Misc. Expenses",
            "value" : (user.profile.expenses.miscExpenses).toString()
          },
          { 
            "label": "Pets",
            "value" : (user.profile.expenses.pets).toString()
          },
          { 
            "label": "Shopping",
            "value" : (user.profile.expenses.shopping).toString()
          },
          { 
            "label": "Taxes",
            "value" : (user.profile.expenses.taxes).toString()
          },
          { 
            "label": "Moving",
            "value" : (user.profile.expenses.moving).toString()
          },
          { 
            "label": "Travel",
            "value" : (user.profile.expenses.travel).toString()
          },
          { 
            "label": "Personal Care",
            "value" : (user.profile.expenses.personalCare).toString()
          }
        ];
    }
  }