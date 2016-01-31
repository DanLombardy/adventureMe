var request = require('request');
var mongoose = require('mongoose');
var moment = require('moment');
var EventbriteSchema = require('../models/eventbrite.js');
var exr = require('./exchange_rate.js');

var airportData = [{ "Airport ID" : 340, "Name" : "Frankfurt Main", "City" : "Frankfurt", "Country" : "Germany", "IATA" : "FRA", "ICAO" : "EDDF", "Latitude" : 50.026421, "Longitude" : 8.543125, "Altitude" : 364, "Timezone" : 1, "DST" : "E", "timezone" : "Europe/Berlin" },
{ "Airport ID" : 507, "Name" : "Heathrow", "City" : "London", "Country" : "United Kingdom", "IATA" : "LHR", "ICAO" : "EGLL", "Latitude" : 51.4775, "Longitude" : -0.461389, "Altitude" : 83, "Timezone" : 0, "DST" : "E", "timezone" : "Europe/London" },
{ "Airport ID" : 580, "Name" : "Schiphol", "City" : "Amsterdam", "Country" : "Netherlands", "IATA" : "AMS", "ICAO" : "EHAM", "Latitude" : 52.308613, "Longitude" : 4.763889, "Altitude" : -11, "Timezone" : 1, "DST" : "E", "timezone" : "Europe/Amsterdam" },
{ "Airport ID" : 813, "Name" : "Johannesburg Intl", "City" : "Johannesburg", "Country" : "South Africa", "IATA" : "JNB", "ICAO" : "FAJS", "Latitude" : -26.139166, "Longitude" : 28.246, "Altitude" : 5558, "Timezone" : 2, "DST" : "U", "timezone" : "Africa/Johannesburg" },
{"Airport ID" : 1128, "Name" : "Cairo Intl", "City" : "Cairo", "Country" : "Egypt", "IATA" : "CAI", "ICAO" : "HECA", "Latitude" : 30.121944, "Longitude" : 31.405556, "Altitude" : 382, "Timezone" : 2, "DST" : "U", "timezone" : "Africa/Cairo" },
{"Airport ID" : 1382, "Name" : "Charles De Gaulle", "City" : "Paris", "Country" : "France", "IATA" : "CDG", "ICAO" : "LFPG", "Latitude" : 49.012779, "Longitude" : 2.55, "Altitude" : 392, "Timezone" : 1, "DST" : "E", "timezone" : "Europe/Paris" },
{  "Airport ID" : 1555, "Name" : "Fiumicino", "City" : "Rome", "Country" : "Italy", "IATA" : "FCO", "ICAO" : "LIRF", "Latitude" : 41.804475, "Longitude" : 12.250797, "Altitude" : 15, "Timezone" : 1, "DST" : "E", "timezone" : "Europe/Rome" },
{"Airport ID" : 1587, "Name" : "Ruzyne", "City" : "Prague", "Country" : "Czech Republic", "IATA" : "PRG", "ICAO" : "LKPR", "Latitude" : 50.100833, "Longitude" : 14.26, "Altitude" : 1247, "Timezone" : 1, "DST" : "E", "timezone" : "Europe/Prague" },
{"Airport ID" : 1701, "Name" : "Ataturk", "City" : "Istanbul", "Country" : "Turkey", "IATA" : "IST", "ICAO" : "LTBA", "Latitude" : 40.976922, "Longitude" : 28.814606, "Altitude" : 163, "Timezone" : 2, "DST" : "E", "timezone" : "Europe/Istanbul" },
{ "Airport ID" : 2188, "Name" : "Dubai Intl", "City" : "Dubai", "Country" : "United Arab Emirates", "IATA" : "DXB", "ICAO" : "OMDB", "Latitude" : 25.252778, "Longitude" : 55.364444, "Altitude" : 62, "Timezone" : 4, "DST" : "U", "timezone" : "Asia/Dubai" },
{ "Airport ID" : 2359, "Name" : "Tokyo Intl", "City" : "Tokyo", "Country" : "Japan", "IATA" : "HND", "ICAO" : "RJTT", "Latitude" : 35.552258, "Longitude" : 139.779694, "Altitude" : 35, "Timezone" : 9, "DST" : "U", "timezone" : "Asia/Tokyo" },
{"Airport ID" : 2564, "Name" : "Guarulhos Gov Andre Franco Montouro", "City" : "Sao Paulo", "Country" : "Brazil", "IATA" : "GRU", "ICAO" : "SBGR", "Latitude" : -23.432075, "Longitude" : -46.469511, "Altitude" : 2459, "Timezone" : -3, "DST" : "S", "timezone" : "America/Sao_Paulo" },
{ "Airport ID" : 2985, "Name" : "Sheremetyevo", "City" : "Moscow", "Country" : "Russia", "IATA" : "SVO", "ICAO" : "UUEE", "Latitude" : 55.972642, "Longitude" : 37.414589, "Altitude" : 622, "Timezone" : 4, "DST" : "N", "timezone" : "Europe/Moscow" },
{  "Airport ID" : 3077, "Name" : "Hong Kong Intl", "City" : "Hong Kong", "Country" : "Hong Kong", "IATA" : "HKG", "ICAO" : "VHHH", "Latitude" : 22.308919, "Longitude" : 113.914603, "Altitude" : 28, "Timezone" : 8, "DST" : "U", "timezone" : "Asia/Hong_Kong" },
{ "Airport ID" : 3093, "Name" : "Indira Gandhi Intl", "City" : "Delhi", "Country" : "India", "IATA" : "DEL", "ICAO" : "VIDP", "Latitude" : 28.5665, "Longitude" : 77.103088, "Altitude" : 777, "Timezone" : 5.5, "DST" : "N", "timezone" : "Asia/Calcutta" },
{ "Airport ID" : 3930, "Name" : "Incheon Intl", "City" : "Seoul", "Country" : "South Korea", "IATA" : "ICN", "ICAO" : "RKSI", "Latitude" : 37.469075, "Longitude" : 126.450517, "Altitude" : 23, "Timezone" : 9, "DST" : "U", "timezone" : "Asia/Seoul" },
{ "Airport ID" : 3316, "Name" : "Changi Intl", "City" : "Singapore", "Country" : "Singapore", "IATA" : "SIN", "ICAO" : "WSSS", "Latitude" : 1.350189, "Longitude" : 103.994433, "Altitude" : 22, "Timezone" : 8, "DST" : "N", "timezone" : "Asia/Singapore" },
{ "Airport ID" : 3361, "Name" : "Sydney Intl", "City" : "Sydney", "Country" : "Australia", "IATA" : "SYD", "ICAO" : "YSSY", "Latitude" : -33.946111, "Longitude" : 151.177222, "Altitude" : 21, "Timezone" : 10, "DST" : "O", "timezone" : "Australia/Sydney" },
{ "Airport ID" : 3364, "Name" : "Capital Intl", "City" : "Beijing", "Country" : "China", "IATA" : "PEK", "ICAO" : "ZBAA", "Latitude" : 40.080111, "Longitude" : 116.584556, "Altitude" : 116, "Timezone" : 8, "DST" : "U", "timezone" : "Asia/Chongqing" },
{  "Airport ID" : 3370, "Name" : "Baiyun Intl", "City" : "Guangzhou", "Country" : "China", "IATA" : "CAN", "ICAO" : "ZGGG", "Latitude" : 23.392436, "Longitude" : 113.298786, "Altitude" : 50, "Timezone" : 8, "DST" : "U", "timezone" : "Asia/Chongqing" },
{ "Airport ID" : 3406, "Name" : "Pudong", "City" : "Shanghai", "Country" : "China", "IATA" : "PVG", "ICAO" : "ZSPD", "Latitude" : 31.143378, "Longitude" : 121.805214, "Altitude" : 13, "Timezone" : 8, "DST" : "U", "timezone" : "Asia/Chongqing" },
{ "Airport ID" : 3469, "Name" : "San Francisco Intl", "City" : "San Francisco", "Country" : "United States", "IATA" : "SFO", "ICAO" : "KSFO", "Latitude" : 37.618972, "Longitude" : -122.374889, "Altitude" : 13, "Timezone" : -8, "DST" : "A", "timezone" : "America/Los_Angeles" },
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
{  "Airport ID" : 3878, "Name" : "Orlando Intl", "City" : "Orlando", "Country" : "United States", "IATA" : "MCO", "ICAO" : "KMCO", "Latitude" : 28.429394, "Longitude" : -81.308994, "Altitude" : 96, "Timezone" : -5, "DST" : "A", "timezone" : "America/New_York" },
{ "Airport ID" : 3885, "Name" : "Suvarnabhumi Intl", "City" : "Bangkok", "Country" : "Thailand", "IATA" : "BKK", "ICAO" : "VTBS", "Latitude" : 13.681108, "Longitude" : 100.747283, "Altitude" : 5, "Timezone" : 7, "DST" : "U", "timezone" : "Asia/Bangkok" }];

// Gets time in UTC format 2 months from current time
var endTime = moment.utc().add(60, 'days').format().replace('+00:00', 'Z');

// @desc: high level function call to make HTTP GET requests through Eventbrite API
// @param: city {string}, country {string}, start {string in UTC format} end {string in UTC format}
// @return: {null}
function getEvent(city, country, start, end){
	var anonymousToken = 'TLCPCICKG4ELFEE7MCFZ';
	var baseUrl = 'https://www.eventbriteapi.com/v3';
	city = encodeURIComponent(city);
	country = encodeURIComponent(country);
	start = encodeURIComponent(country);
	end = encodeURIComponent(end);
	var eventData = [];
	
	// @desc: builds a base uri string to pass in request()
	// @return: {string}
	var buildBaseSearchString = function(city,country,start,end){
		var result = baseUrl + '/events/search/?';
		if(city){
			result = result.concat('&venue.city=', city);
		}
		if(country){
			result = result.concat('&venue.country=', country);
		}
		if(start){
			result = result.concat('&start_date.range_start=', start);						
		}
		if(end){
			result = result.concat('&start_date.range_end=', end);						
		}
		//result = result.concat('&sort_by=best');
		result = result.concat('&expand=venue,organizer,ticket_classes');
		console.log('searchString: ' + result);
		return result;
	};

	// @desc: builds a base uri string with page number to pass in request() when there are multiple paginated response
	// @input: page {number}
	// @return: {string}
	var buildSearchStringPaginate = function(page){
		var result = baseString.concat('&page=' + page);
		console.log('searchString: ' + result);
		return result;
	};

	// @desc: Sends out HTTP requests to Eventbrite API, and gets up to 2 paginated response to save to mongoDB
	// @input: url {string}
	// @return: {null}
	function queryAPI(url){

		request({
			url:url,
			headers: {Authorization: 'Bearer ' + anonymousToken}
		}, 
			function(error, response, body){
				if(!error && response.statusCode === 200){
					var result = JSON.parse(body);
					var page = result.pagination.page_number;

					//Loops through each event and save to mongoDB
					result.events.forEach(function(event){
						var data = new EventbriteSchema();
						var costUSD = {};
						for(var key in event){
							if(event.hasOwnProperty(key)){
								if(key === 'id'){ 
									data['_id'] = event['id'];
								}
								else {
									data[key] = event[key];
									if(key === 'ticket_classes'){
										if(event[key].length){
											console.log(event[key]);
											if(event[key][0]['free']){
												costUSD['cost'] = 0;
											}else {
												if(event[key][0].hasOwnProperty('cost')){
													costUSD['cost'] = exr(event[key][0]['cost']['currency'], event[key][0]['cost']['value']/100);													
												}
												else {
													costUSD['cost'] = 0;
												}
}
											costUSD['name'] = event[key][0]['name'];
											if(event[key][0].hasOwnProperty('description')){
												costUSD['description'] = event[key][0]['description'];											
											}
											console.log(costUSD);
											data['costUSD'] = costUSD;																		
										}
									}
								}
							}
						}
						//save to mongoDB
						var dataObject = data.toObject();
						delete dataObject.id;
						//make sure no duplicates are stored in the database
						EventbriteSchema.update({_id: data.id}, dataObject, {upsert: true}, function(err){console.log(err);});
					});

					//Make sure don't go more than 2 paginated response per city so not to exceed API limit
					if(page < result.pagination.page_size && page < 2){
						queryAPI(buildSearchStringPaginate(++page));
					}		
				}
				else {
					console.log('error:' + response.statusCode + ' ' + error);
				}
		});
	}

	//Start the function calls
	var baseString = buildBaseSearchString(city,country,start,end);
	queryAPI(baseString);

}

// Loops through each airport object and saves events in that city to mongoDB
module.exports = function(){
	airportData.forEach(function(airport){
		getEvent(airport.City, '','',endTime);
	});
};

