var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require(__dirname + '/enums.js');

//Express routers
app.use(express.static('client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));



//database seeders

//package database seeder
//Pull data from unreal deals for each depart city and save to database

//event database seeders
//Pull data from eventbrite


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
