var request = require('request');

module.exports = function(){
  request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=SEA&destinationTLA=LAS&startDate=2016-02-02&endDate=2016-02-25&lengthOfStay=3&allowDuplicates=false&apikey=IpkAtcHnccITkp7vrPmmDggwqVWwpjjO', function(error, response,body){
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

      console.log(packageArray[0]);
    }
  })
}
