'use strict';
var mongoose = require('mongoose');

// ThingsToDo schema for mongoDB
//
var ThingsToDoSchema = new mongoose.Schema({
	categories: {type: Object},
	_id: {type: String},
	title: {type: String},
	imageUrl: {type: String},
	largeImageURL: {type: String},
	fromPrice: {type: Number},
	city: {type: String}
});

module.exports = mongoose.model('ThingsToDo', ThingsToDoSchema);
