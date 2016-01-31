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

var budget = 0;
var startDate = "";
var endDate = "";
var personCount = 2;
var departureCity = "";
var departureCode = "";

var Eventbrite = require(__dirname + '/models/eventbrite');
var ThingsToDo = require(__dirname + '/models/thingsToDo');
var eventData;

var moment = require('moment');

//Express routers
app.use(express.static('client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//requestDeals();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/adventure_me');


//database seeders

//unreal deal pull and array build
//Pull data from unreal deals for each depart city and save to database


//event database seeders
//Pull data from eventbrite

//pull data from
var mySocket;

// socket emitters and broadcasters
io.on(enums.CONNECTION, function(socket){
    console.log('Client connected...');
    mySocket = socket;

    socket.on('formData', function(data){
      budget = data.spend;
      startDate = data.leave;
      endDate = data.return;
      personCount = data.persons;
      //departureCity currently assigned from within getAdventureDeals() function
      departureCode = data.IATA;
      var lengthOfStay = getDateDifference(startDate, endDate);
      console.log(data);
      getAdventureDeals(budget, startDate, endDate, lengthOfStay, departureCode, personCount);
	});





});

//@desc goes out to every city and grab the top 100 events happening within the next 2 months
// ONLY need to run once per machine to populate local mongodb server.
//eventbriteSeed();
//thingsToDoSeed();



// ***********************************************



//var travelFund = budget * .6;
//var funFund = budget * .4;
//deals = dealsRequester();

var getAdventureDeals = function(budget, startDate, endDate, lengthOfStay, originTLA, personCount) {
  console.log("I got here!");
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
    console.log(deals);
    //   parse data and return data or false, this is a place holder for me
    mySocket.emit('potentialAdventures', deals);
  });
};

var getEventData = function(budget, startDate, endDate, city) {
  Eventbrite.find(/* filter for: remaining budget, city, */
    { $and:[{"costUSD.cost":{$lte:budget}},{"venue.address.city": city}]}, function(err, data) {
    if (err) console.log(err);

    var eventData = data;
    ThingsToDo.find({$and:[{"costUSD.cost":{$lte:budget}},{"venue.address.city": city}]}, function(err, data) {
      if (err) console.log(err);
      var fullData = eventData.concat(data);
      var eventJSON = {
        events: fullData
      };
      console.log(eventJSON);
    });
  });
};

function getDateDifference(startDate, endDate) {
  var startDate = moment(startDate);
  var endDate = moment(endDate);
  return endDate.diff(startDate, 'days');
}




server.listen(3000, function(){
  console.log("Server up. All systems go.")
});
