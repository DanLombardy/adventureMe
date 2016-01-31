var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require(__dirname + '/enums.js');
var eventbriteSeed = require(__dirname + '/lib/eventbriteSeeder.js');

//Express routers
app.use(express.static('client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/adventure_me');


//database seeders

//package database seeder
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

//@desc goes out to every city and grab the top 100 events happening within the next 2 months
// ONLY need to run once per machine to populate local mongodb server.
//eventbriteSeed();



server.listen(3010, function(){
  console.log("Server up. All systems go.")
});
