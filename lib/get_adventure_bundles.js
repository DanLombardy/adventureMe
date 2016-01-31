//var dealsRequester = require('DEALSREQUESTER');                         //filepath?

var mongoose = require('mongoose');

//var ToDo = require(__dirname + '/../models/toDo');
var Eventbrite = require(__dirname + '/../models/eventbrite');
var eventData;

//var travelFund = budget * .6;
//var funFund = budget * .4;
//deals = dealsRequester();

var getAdventureBundles = function(budget, startDate, endDate, departureCity, personCount) {
  Eventbrite.find({}, function(err, data) {
    if (err) console.log(err);
    console.log('hello 2');
      //eventData = data;
      console.log(data);
  })
}


getAdventureBundles(null, null, null, null, null);

//module.exports = exports = getAdventureBundles;

