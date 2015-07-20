var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var configDB = require('../config/database.js');
var Schema = mongoose.Schema;

//chethana 
exports.jsonFileManagement = function (req, res) {
	
	var startTime = process.hrtime(); // start time to connect db
	MongoClient.connect(configDB.url, function(err, db) {

		if(err) { return console.dir(err); }

		console.log("Connected to MATRIX_JSON db");
		var collection = db.collection('MATRIX_JSON');
		
		console.log("Data selected from DB for drop down");
		collection.find().toArray(function(err, items) {
			var diffTime = process.hrtime(startTime); //  end time to connect to db
			
			console.log("While Database Connection JSONFILE : Time Taken in Seconds, NanoSeconds = "+(diffTime));
			console.log("While Database Connection JSONFILE : Time Taken in Microseconds = "+(diffTime[0] * 1000000 + diffTime[1]/1000));
			dbConntime = (diffTime); 
			
			
		console.log("item in 1st select  : ",items);
		var MarketName = [];
		for(var ii = 0; ii<items.length; ii++)
			{
			console.log("item in 2nd select drop down : "+ii+" = "+items[ii].MARKET_NAME);
			MarketName.push(items[ii].MARKET_NAME);
			}
		var JsonDetail = [items[0].JSON_NAME,items[0].JSON_URL];
			
		console.log("1 " + dbConntime);
			res.render('\jsonfilemanagement',{user: req.user,abc: {item1: items, item2: MarketName, item3: JsonDetail}, user1:dbConntime});
		 });
	
		
	});
}
