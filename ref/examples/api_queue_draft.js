var fs = require('fs');
var newStuff = "";

// user passes starting point, dates, budget

var q = require('async').queue(function(task, callback) {
  newStuff += task.name;
  callback();
}, 1);

q.drain = function() {
  fs.writeFileSync('test.txt', newStuff);
}

q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
  console.log('done! ');
});

http://terminal2.expedia.com:80/x/deals/packages?originTLA=SEA&destinationTLA=LAS&startDate=2016-02-01&endDate=2016-02-29&lengthOfStay=5&roomCount=1&adultCount=2&childCount=0&infantCount=0&limit=50&sortOrder=Desc&sortStrategy=SavingsPercentage&maxPackagePrice=1000&allowDuplicates=false
