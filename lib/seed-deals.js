var request = require('request');
var cityArray = require(__dirname + '/../ref/airportData.js').airportData;

var i = 0;
var arrivalCities = [];
module.exports = function seedDeals(budget, startDate, endDate, lengthOfStay, originTLA, callback){
    request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + originTLA +
      '&destinationTLA=' + cityArray[i]["IATA"] +
      '&startDate=' + startDate +
      '&endDate=' + endDate +
      '&lengthOfStay=' + lengthOfStay +
      '&allowDuplicates=false&maxPackagePrice=' + budget +
      '&apikey=IpkAtcHnccITkp7vrPmmDggwqVWwpjjO', function(error, response,body){
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
        } else {
          callback(arrivalCities);
        }
      }
    });

}
