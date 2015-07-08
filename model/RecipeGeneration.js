var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var configDB = require('../config/database.js');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	ID: Number,
	FILENAME: String,	
	VERSION: Number,
	RECIPE_FILE: String,	
	EXTRANET_URL: String,
	STATUS: Number,
	ERROR_MESSAGE: String,
	MT_TESTCASES_ID: Number,
	CREATED_BY: String,
	CREATED_DATE: Date,
	MODIFIED_BY: String,
	MODIFIED_DATE: Date,
	EXTRANET_FILE_NAME: String

});

var RecipeStepsSchema = new Schema({
	MT_RECIPEXML_NEW_ID:	Number,
	STEP_Number:	Number,
	STEP_DETAILS:	String,
	FRONTEND:	String,
	BACKEND:	String,
	AUDIO_ALERT:	String,
	BATTERY:	String,
	BLUETOOTH:	String,	
	CAMERA:	String,
	CHARGING:	String,
	DISPLAY_KEYBORED:	String,
	MEMORY_CARD:	String,
	POWER_ON_OFF:	String,
	SIM_CARD:	String,
	WIFI: String,
	NO_COMPLAINT:	String
	
	});




var XUser = mongoose.model('mt_recipexmls', RecipeSchema);
//recipexml table insert new recipe file name


var SUser = mongoose.model('mt_recipe_steps', RecipeStepsSchema);
// steps table insert the recipes details as each record based on the test cases			


//chethana 
exports.showRecipePage = function (req, res) {
	MongoClient.connect(configDB.url, function(err, db) {

		if(err) { return console.dir(err); }

		console.log("Connected to mt_recipexmls db in configDB.url");
		var collection = db.collection('mt_recipexmls');
										
		console.log("Data selected from DB for drop down");
		collection.find({STATUS:0}).toArray(function(err, items) {
			console.log("items : ",items);
			
		var collection2 = db.collection('testcases');
		console.log("Data selected from DB for testcase tab");
		var stream = collection2.find({STATUS:0}).stream();
		stream.on("data", function(item) {
		console.log("item : ",item.TESTCASE_NAME);
		res.render('RecipeGenerationNew',{ user: req.user, item: items , testCaseName: item.TESTCASE_NAME});
			
		 });
		 stream.on("end", function() {}); 
		});
	});
	
};

//

exports.loadTestcases = function (req, res) {
	MongoClient.connect(configDB.url, function(err, dbs) {

	if(err) { return console.dir(err); }

	console.log("Connected to db in post");
			
	var formData = req.query.id;
	var id = parseInt(formData);
	console.log("MT_RECIPEXML_NEW_ID:"+id);
		
	var collection2 = dbs.collection('mt_recipe_steps');
		
	collection2.find({MT_RECIPEXML_NEW_ID:id}).toArray(function(err, itemsteps) {
	console.log("itemstep : ",itemsteps);	
				
	res.send(itemsteps);
			
			});
	 
	});
};


exports.saveRecipe = function(req, res){
	
	var form = req.form; //req.form;
	console.log("form details" + form);
	mongoose.connect(configDB.url, function (err, res) {
		if (err) { 
		console.log ('ERROR connecting to: ' + configDB.url + '. ' + err);
		} else {
		console.log ('Succeeded connected to: ' + configDB.url);
		}	
});
	
		
	/*
	 * get the max(id) from MT_RECIPEXML assign it a var increment it and assign to new variable if number of record is zero then assign i=0
	 */
	
	var recipeXMLCount=0;
	var recipeXMLID=0; 

	
	XUser.find(function (err, kittens) {
		  if (err) return console.error(err);
		  recipeXMLCount= kittens.length;
		  
		  recipeXMLID=recipeXMLCount+1;
		  console.log("recipeXMLID : "+recipeXMLID);
		
		  var userName = "";
			
			if(req.user.local.email)
				{
				userName = req.user.local.email;
				}
			if(req.user.facebook.token)
				{
				userName = req.user.facebook.email; 
				}
			if(req.user.google.token){
				userName = req.user.google.email;
			}
			if(req.user.twitter.token){
				userName = req.user.twitter.username;
			}
	
		var recipeFileName =req.query.recipeFileName;
		console.log("recipeFileName"+ recipeXMLID);
		var xmldoe = new XUser ({
				ID: recipeXMLID,
				FILENAME:recipeFileName,	
				VERSION: '0',
				RECIPE_FILE: 'recipefile.xml',//steps details	
				EXTRANET_URL: 'https://rsdsecure-test.motorola.com/download/testing12.txt',
				STATUS: 0,
				ERROR_MESSAGE: '',
				MT_TESTCASES_ID: 103,
				CREATED_BY: userName,
				CREATED_DATE: new Date(),
				MODIFIED_BY: userName,
				MODIFIED_DATE: new Date(),
				EXTRANET_FILE_NAME:'testing12'
				});

				xmldoe.save(function (err) {if (err) console.log ('Error on save!')});
				
				console.log("entered save recipe");

				var generatedJsonString = req.query.recipeString;
				console.log("generateJsonString : " + generatedJsonString);
				
				var recipes = JSON.parse(generatedJsonString);
				//console.log("recipies"+ recipes);
				

						

	
	
	console.log("req.query.TClength"+ req.query.TClength);		  
	for(var i=0; i<req.query.TClength; i++)
	{

	var stepsdoe = new SUser ({
		MT_RECIPEXML_NEW_ID:recipeXMLID,
		STEP_Number:i,
		STEP_DETAILS:recipes[i].testCase,	
		FRONTEND: recipes[i].frontEnd,
		BACKEND:	recipes[i].backEnd,
		AUDIO_ALERT: recipes[i].audioAlert,
		BATTERY:	recipes[i].battery,
		BLUETOOTH:	recipes[i].bluetooth,	
		CAMERA:	recipes[i].camera,
		CHARGING:	recipes[i].charging,
		DISPLAY_KEYBORED:	recipes[i].displayKeypad,
		MEMORY_CARD:	recipes[i].memoryCard,
		POWER_ON_OFF:	recipes[i].powerOnOf,
		SIM_CARD:	recipes[i].simCard,
		WIFI:recipes[i].wifi,
		NO_COMPLAINT:recipes[i].complaint
		});

	stepsdoe.save(function (err) {if (err) console.log ('Error on save!')});
	
	
	
	}
	})	
	res.render('welcomepage', {user: req.user});
	res.end();
	
	
	

	
};