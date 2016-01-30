// Run this code to calculate distances between all airports. Currently points to
// sample airport data.

var fs = require('fs');

var airports = JSON.parse(fs.readFileSync('./ref/airportData.js'));
var R = 3959; // miles

// Converts from degrees to radians.
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};

//calculate distances between two airports
for(var i = 0; i < airports.length; i++) {
  if (!airports[i].relationships) airports[i].relationships = [];
  var lat1 = airports[i].Latitude;
  var lon1 = airports[i].Longitude;
  var φ1 = Math.toRadians(lat1);
  for(var p = i + 1; p < airports.length; p++) {
    if (!airports[p].relationships) airports[p].relationships = [];
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
    airports[i].relationships.push({IATA: airports[p].IATA, Name: airports[p].Name, distance: d});
    airports[p].relationships.push({IATA: airports[i].IATA, Name: airports[p].Name, distance: d});
  }
}

fs.writeFileSync('./ref/distances.json', JSON.stringify(airports), {});
