// Run this code to calculate distance in miles between all airports. Currently points to
// sample airport data.

var fs = require('fs');

var airports = require(__dirname + '/../ref/airportData.js').airportData;
//JSON.parse(fs.readFileSync(__dirname + '/../ref/airportData.json'));
var R = 3959; // radius of the earth, in miles

// Converts from degrees to radians.
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};

//calculate distances between two airports
for(var i = 0; i < airports.length; i++) {
  if (!airports[i].relationships) airports[i].relationships = {};
  var lat1 = airports[i].Latitude;
  var lon1 = airports[i].Longitude;
  var φ1 = Math.toRadians(lat1);
  for(var p = i + 1; p < airports.length; p++) {
    if (!airports[p].relationships) airports[p].relationships = {};
    var lat2 = airports[p].Latitude;
    var lon2 = airports[p].Longitude;
    var φ2 = Math.toRadians(lat2);
    var Δφ = Math.toRadians(lat2-lat1);
    var Δλ = Math.toRadians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    airports[i].relationships[airports[p].IATA] = d;
    airports[p].relationships[airports[i].IATA] = d;
  }
}

fs.writeFileSync(__dirname + '/../ref/distances.js', JSON.stringify(airports), {});
