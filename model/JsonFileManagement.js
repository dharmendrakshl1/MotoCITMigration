var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var configDB = require('../config/database.js');
var Schema = mongoose.Schema;

//chethana 
exports.jsonFileManagement = function (req, res) {
	MongoClient.connect(configDB.url, function(err, db) {

		if(err) { return console.dir(err); }

		console.log("Connected to MATRIX_JSON db");
		var collection = db.collection('MATRIX_JSON');
		
		console.log("Data selected from DB for drop down");
		collection.find().toArray(function(err, items) {
		console.log("item in 1st select  : ",items);
		var MarketName = [];
		for(var ii = 0; ii<items.length; ii++)
			{
			console.log("item in 2nd select drop down : "+ii+" = "+items[ii].MARKET_NAME);
			MarketName.push(items[ii].MARKET_NAME);
			}
		var JsonDetail = [items[0].JSON_NAME,items[0].JSON_URL];
		
			res.render('\jsonfilemanagement ',{user: req.user,abc: {item1: items, item2: MarketName, item3: JsonDetail}});
		 });
	
		
	});
}
