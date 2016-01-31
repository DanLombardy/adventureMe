var request = require('request');
var cityArray = require(__dirname + '/../ref/airportData.js').airportData;

var i = 0;
var arrivalCities = [];
module.exports = function seedDeals(budget, startDate, endDate, lengthOfStay, originIATA, callback){
    request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + originIATA + '&destinationTLA=' + cityArray[i]["IATA"] +'&startDate=' + startDate +'&endDate=' + endDate +'&lengthOfStay=5&allowDuplicates=false&maxPackagePrice=' + budget + '&apikey=IpkAtcHnccITkp7vrPmmDggwqVWwpjjO', function(error, response,body) {
      if(error){
        console.log(error)
        seedDeals();
        i++;
      }

      if(response.statusCode == 404){
        console.log("404 Not found for " + cityArray[i]["IATA"]  );
      }



        //Find the array at deals{packages:[]}
        //grab the packages array and put into own array
        //delete properites from objects we dont want
        //return array
        if(body.deals !== 'undefined') {
          var clean = JSON.parse(body);
          console.log(clean);
          var packageArray = clean.deals.packages;
          packageArray.forEach(function(deal){
             delete deal.marker;
          });
          arrivalCities.push(packageArray);
          if (i < 33){

          console.log("Pulling data for " + cityArray[i]["City"]);
          seedDeals(budget, startDate, endDate, lengthOfStay, originIATA, callback);
          } else {
            callback(arrivalCities);
          }
        }
        i++;

    });

}
