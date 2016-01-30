var mongoose = require('mongoose');
var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.static('client'));


app.listen(process.env.PORT || 3000, function(){
  console.log("Server up. All systems go.")
});
