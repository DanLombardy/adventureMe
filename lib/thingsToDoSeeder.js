var request = require('request');
var mongoose = require('mongoose');
var moment = require('moment');


function getThingsToDo(city){
	var AccessKey = 'sPu7kEE2Xdb1R7lrKLmxT5OpxsJkDttL';
	var baseUrl = 'http://terminal2.expedia.com/x';
	city = encodeURIComponent(city);

	function buildSearchString(city, start, end){
		var result = baseUrl;
		if(city){
			result = result.concat('/activities/search?location=', city);
		}
		if(start){
			result = result.concat('&startDate=' + start);
		}
		if(end){
			result = result.concat('&endDate=' + end);
		}
		console.log(result);
		return result;
	}

	function queryAPI(url){
		request({
			url: url,
			headers: {Authorization: 'expedia-apikey key=' + AccessKey}
		},
			function(error, response, body){
				if(!error && response.statusCode === 200){
					var bodyObject = JSON.parse(body);
					var activities = bodyObject.activities;
					activities.forEach(function(act, index){
						console.log(act.title);
					})
				}
				else {
					console.log('error: ' + response.statusCode + error);
				}
		});
	}

	var startDate = moment.utc().format('YYYY-MM-DD');
	var endDate = moment.utc().add(14, 'days').format('YYYY-MM-DD');
	var searchString = buildSearchString(city,startDate,endDate);
	

}

module.exports = function(){
	getThingsToDo('Seattle');
};