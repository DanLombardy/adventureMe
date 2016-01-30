var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require(__dirname + '/enums.js');
var request = require('request');
var requestDeals = require(__dirname + "/lib/seed-deals.js")

var budget = 0;
var startDate = "";
var endDate = "";
var personCount = 2;
var departureCity = "";
var departureCode = "";


//Express routers
app.use(express.static('client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// requestDeals();


//database seeders

//unreal deal pull and array build
//Pull data from unreal deals for each depart city and save to database


//event database seeders
//Pull data from eventbrite

//pull data from


// socket emitters and broadcasters
io.on(enums.CONNECTION, function(socket){
    console.log('Client connected...');

    // socket.on('join', function(data) {
    //     console.log(data);
    // });

});






server.listen(3000, function(){
  console.log("Server up. All systems go.")
});
