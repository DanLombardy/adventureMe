var dealsRequester = require('DEALSREQUESTER');                         //filepath?
var ToDo = require(__dirname + '/../models/toDo');
var Event = require(__dirname + '/../models/event');

var getAdventureBundles = function(budget, startDate, endDate, departureCity, personCount) {
  var travelFund = budget * .6;
  var funFund = budget * .4;
  var deals = dealsRequester(budget, startDate, endDate, startPoint, personCount);
  var toDos;
  var events;

  Events.find({

  }, function() {

  });

  ToDo.find({
    departureCity: departu
  }, function() {

  });

}

var

module.exports = exports = getAdventureBundles;
