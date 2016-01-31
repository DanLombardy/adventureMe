'use strict';
var mongoose = require('mongoose');

// Eventbrite schema for mongoDB
//
var EventbriteSchema = new mongoose.Schema({
	capacity: {type: Number},
	category_id: {type: String},
	currency: {type: String},
	description: {type: Object},
	_id: {type: String},
	end: {type: Object},
	logo: {type: Object},
	name: {type: Object},
	start: {type: Object},
	status: {type: String},
	ticket_classes: {type: Array},
	url: {type: String},
	venue: {type: Object}
});

module.exports = mongoose.model('eventbrite', EventbriteSchema);