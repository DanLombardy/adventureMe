var request = require('request');


var cityArray = [{ "Airport ID" : 3469, "Name" : "San Francisco Intl", "City" : "San Francisco", "Country" : "United States", "IATA" : "SFO", "ICAO" : "KSFO", "Latitude" : 37.618972, "Longitude" : -122.374889, "Altitude" : 13, "Timezone" : -8, "DST" : "A", "timezone" : "America/Los_Angeles" },
{"Airport ID" : 3484, "Name" : "Los Angeles Intl", "City" : "Los Angeles", "Country" : "United States", "IATA" : "LAX", "ICAO" : "KLAX", "Latitude" : 33.942536, "Longitude" : -118.408075, "Altitude" : 126, "Timezone" : -8, "DST" : "A", "timezone" : "America/Los_Angeles" },
{"Airport ID" : 3494, "Name" : "Newark Liberty Intl", "City" : "Newark", "Country" : "United States", "IATA" : "EWR", "ICAO" : "KEWR", "Latitude" : 40.6925, "Longitude" : -74.168667, "Altitude" : 18, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" },
{ "Airport ID" : 3550, "Name" : "George Bush Intercontinental", "City" : "Houston", "Country" : "United States", "IATA" : "IAH", "ICAO" : "KIAH", "Latitude" : 29.984433, "Longitude" : -95.341442, "Altitude" : 97, "Timezone" : -6, "DST" : "A", "timezone" : "America/Chicago" },
{"Airport ID" : 3576, "Name" : "Miami Intl", "City" : "Miami", "Country" : "United States", "IATA" : "MIA", "ICAO" : "KMIA", "Latitude" : 25.79325, "Longitude" : -80.290556, "Altitude" : 8, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" },
{  "Airport ID" : 3577, "Name" : "Seattle Tacoma Intl", "City" : "Seattle", "Country" : "United States", "IATA" : "SEA", "ICAO" : "KSEA", "Latitude" : 47.449, "Longitude" : -122.309306, "Altitude" : 433, "Timezone" : -8, "DST" : "A", "timezone" : "America/Los_Angeles" },
{ "Airport ID" : 3670, "Name" : "Dallas Fort Worth Intl", "City" : "Dallas-Fort Worth", "Country" : "United States", "IATA" : "DFW", "ICAO" : "KDFW", "Latitude" : 32.896828, "Longitude" : -97.037997, "Altitude" : 607, "Timezone" : -6, "DST" : "A", "timezone" : "America/Chicago" },
{"Airport ID" : 3682, "Name" : "Hartsfield Jackson Atlanta Intl", "City" : "Atlanta", "Country" : "United States", "IATA" : "ATL", "ICAO" : "KATL", "Latitude" : 33.636719, "Longitude" : -84.428067, "Altitude" : 1026, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" },
{ "Airport ID" : 3751, "Name" : "Denver Intl", "City" : "Denver", "Country" : "United States", "IATA" : "DEN", "ICAO" : "KDEN", "Latitude" : 39.861656, "Longitude" : -104.673178, "Altitude" : 5431, "Timezone" : -7, "DST" : "A", "timezone" : "America/Denver" },
{ "Airport ID" : 3797, "Name" : "John F Kennedy Intl", "City" : "New York", "Country" : "United States", "IATA" : "JFK", "ICAO" : "KJFK", "Latitude" : 40.639751, "Longitude" : -73.778925, "Altitude" : 13, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" },
{"Airport ID" : 3830, "Name" : "Chicago Ohare Intl", "City" : "Chicago", "Country" : "United States", "IATA" : "ORD", "ICAO" : "KORD", "Latitude" : 41.978603, "Longitude" : -87.904842, "Altitude" : 668, "Timezone" : -6, "DST" : "A", "timezone" : "America/Chicago" },
{  "Airport ID" : 3878, "Name" : "Orlando Intl", "City" : "Orlando", "Country" : "United States", "IATA" : "MCO", "ICAO" : "KMCO", "Latitude" : 28.429394, "Longitude" : -81.308994, "Altitude" : 96, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" }
];

var i = 0;
var arrivalCities = [];
module.exports = function seedDeals(callback){
    request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=SEA&destinationTLA='+ cityArray[i]["IATA"] + '&startDate=2016-02-02&endDate=2016-02-25&lengthOfStay=3&allowDuplicates=false&apikey=IpkAtcHnccITkp7vrPmmDggwqVWwpjjO', function(error, response,body){
      if(error){console.log(error)};
      if (!error && response.statusCode == 200){
        //Find the array at deals{packages:[]}
        //grab the packages array and put into own array
        //delete properites from objects we dont want
        //return array

        var clean = JSON.parse(body);
        var packageArray = clean.deals.packages;
        packageArray.forEach(function(deal){
           delete deal.marker;
        });
        arrivalCities.push(packageArray);

        if (i < 34){
          i++;
        console.log("Pulling data for" + cityArray[i]["City"]);
        seedDeals();
        }
      }
    });

}
