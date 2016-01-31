var request = require('request');
var cityArray = require(__dirname + '/../ref/airportData.js').airportData;

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

        if (i < 33){
          i++;
        console.log("Pulling data for " + cityArray[i]["City"]);
        seedDeals();
        }
      }
    });

}
