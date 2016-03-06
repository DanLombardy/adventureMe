var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require(__dirname + '/enums.js');

var eventbriteSeed = require(__dirname + '/lib/eventbriteSeeder.js');
var thingsToDoSeed = require(__dirname + '/lib/thingsToDoSeeder.js');

var request = require('request');
var seedDeals = require(__dirname + "/lib/seed-deals.js");

var moment = require('moment');
var Eventbrite = require(__dirname + '/models/eventbrite');
var ThingsToDo = require(__dirname + '/models/thingsToDo');

var budget = 0;
var startDate = "";
var endDate = "";
var personCount = 2;
var departureCity = "";
var departureCode = "";
var lengthOfStay = 5;
var eventData;
var mySocket;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/adventure_me');

//Express routers
app.use(express.static('client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var getAdventureDeals = function(budget, startDate, endDate, lengthOfStay, originTLA, personCount) {
  var airport = require('./ref/distances.js').filter(function(airport) {
    return airport.IATA === originTLA;
  })[0];
  departureCity = airport.City;
  var airportRelationships = airport.relationships;
  console.log(budget, startDate, endDate, lengthOfStay, originTLA, personCount);
  seedDeals(budget, startDate, endDate, lengthOfStay, originTLA, function(cities) {
    cities.sort(function(deals1, deals2) {
      return airportRelationships[deals2[0].destinationTLA] - airportRelationships[deals1[0].destinationTLA];
    });
    var deals = {deals: cities.slice(0,9)};
    //   parse data and return data or false, this is a place holder for me
    mySocket.emit('potentialAdventures', deals);
  });
};

var getEventData = function(budgetRemaining, startDate, endDate, city, callback) {
  Eventbrite.find(
    { $and:[{"costUSD.cost":{$lte:budgetRemaining}},{"venue.address.city": city}]}, function(err, data) {
    if (err) console.log(err);

    eventData = data;
    ThingsToDo.find({$and:[{"costUSD.cost":{$lte:budgetRemaining}},{"venue.address.city": city}]}, function(err, data) {
      if (err) console.log(err);
      var fullData = eventData.concat(data);
      var eventJSON = {
        events: fullData
      };
      console.log(eventJSON);
      callback(eventJSON);
    });
  });
};

function datePlus90(startDate) {
  var momentStart = moment(startDate);
  return momentStart.add(90, 'days').format("YYYY-MM-DD");
};

// socket emitters and broadcasters
io.on(enums.CONNECTION, function(socket){
    console.log('Client connected...');
    mySocket = socket;

    socket.on('formData', function(data){
      budget = data.spend;
      startDate = data.leave;
      endDate = datePlus90(startDate);
      lengthOfStay = data.return;
      personCount = data.persons;
      //departureCity currently assigned from within getAdventureDeals() function
      departureCode = data.IATA;
      console.log(data);
      getAdventureDeals(budget, startDate, endDate, lengthOfStay, departureCode, personCount);
	   });

    socket.on('eventRequest', function(data){
      var remainingMoney = budget - data.cost;
      console.log("Event data is " + data.city + " some other cost: "+ data.cost);
      getEventData(remainingMoney, startDate, endDate, data.city, function(eventJSON){
        console.log(eventJSON);
        socket.emit("eventData", eventJSON);
      });
    });
});

server.listen(3000, function(){
  console.log("Server up. All systems go.")
});
