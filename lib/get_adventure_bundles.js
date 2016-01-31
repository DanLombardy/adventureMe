var dealsRequester = require('DEALSREQUESTER');                         //filepath?

var Promise = require('bluebird');
var mongoose = require('mongoose');

Promise.promisifyAll(mongoose);

var ToDo = require(__dirname + '/../models/toDo');
var Event = require(__dirname + '/../models/event');

var travelFund = budget * .6;
var funFund = budget * .4;
//deals = dealsRequester();

var getAdventureBundles = function(budget, startDate, endDate, departureCity, personCount) {
  Promise.props({
    events: Event.find({}).execAsync();
    //todos: ToDo.find({}).execAsync();
    //deals: dealsRequester(budget, startDate, endDate, startPoint, personCount);
  })
});

module.exports = exports = getAdventureBundles;
