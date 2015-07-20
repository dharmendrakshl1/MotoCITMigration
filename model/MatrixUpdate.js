/**
 * New node file
 */
var mongoose = require('mongoose');
var configDB = require('../config/database.js');
var MongoClient = require('mongodb').MongoClient;
var Schema = mongoose.Schema;
var js2xmlparser = require("js2xmlparser");
var matfile;
var matfiledata;
var MatrixUpdate = require('./MatrixUpdate');
var mktName;

/*	for updated UI
 * exports.jsonpage =  function (req, res){
	res.render('jsonfilemanagement');
};*/

// Akshatha
exports.jsonfile = function (req, res){
	var form = req.form; //req.form;
	//console.log("form details " + form);
	console.log(req.body.marketName);
	console.log(req.body.fileName);
	console.log(req.body.fileURL);
	
	MongoClient.connect(configDB.url, function(err, dbs) {

		if(err) { return console.dir(err); }

		console.log("Connected to db in post");
		
		// getting data from form
		 mktName = req.body.marketName;
		var jsonfilename = req.body.fileName;
		var jsonurl = req.body.fileURL;
		
		
		
		var collectionMATRIX_ASSOCIATION = dbs.collection('MATRIX_ASSOCIATION');
		var collectionMATRIX_JSON = dbs.collection('MATRIX_JSON');
		var collectionCARRIER_MATRIX = dbs.collection('CARRIER_MATRIX');
		
		// update jsonfilename jsonurl in json table
		collectionMATRIX_JSON.update({MARKET_NAME:mktName}, {$set:{JSON_NAME:jsonfilename}}, {w:1, multi: true}, function(err, result) {});
		collectionMATRIX_JSON.update({MARKET_NAME:mktName}, {$set:{JSON_URL:jsonurl}}, {w:1, multi: true}, function(err, result) {});
	
		// redirect to success page
		
		
		res.render('success', {user: req.user});
		
		});
	};

exports.matdownload = function (req, res){
	res.render('matrixdownload', {user: req.user});
	
};


exports.download = function (req, res){
	//var mktName = req.body.marketName;
	console.log(mktName);
	MongoClient.connect(configDB.url, function(err, dbs) {

		if(err) { return console.dir(err); }

		console.log("Connected to db in post");
		var collectionMATRIX_ASSOCIATION = dbs.collection('MATRIX_ASSOCIATION');
		var collectionMATRIX_JSON = dbs.collection('MATRIX_JSON');
		var collectionCARRIER_MATRIX = dbs.collection('CARRIER_MATRIX');
		
		
		// to get PMName where phonemodel id is equal in both  tables
		var qryPMAID = collectionMATRIX_JSON.find( { "MARKET_NAME": mktName } ).stream();
		qryPMAID.on("data", function(itemj) {
		console.log("itemj : ",itemj);
		var PMid = itemj.PMAID;
		
			// got CARRIER_ID n details from MATRIX_ASSOCIATION table 
		
		var qryCarrier = collectionMATRIX_ASSOCIATION.find( { "PMAID": PMid } ).stream();
		qryCarrier.on("data", function(itema) {
		console.log("itema : ",itema);
		
		//to get carrier matrix table details
		
		var qrymatrix = collectionCARRIER_MATRIX.find( { "PMAID": PMid } ).stream();
		qrymatrix.on("data", function(itemc) {
		console.log("itemc : ",itemc);
		
		//to update the version
		var v = itemc.VERSION;
		v++; // increament version in carrier
		console.log("version", v);
		collectionCARRIER_MATRIX.update({PMAID:PMid}, {$set:{VERSION:v}}, {w:1, multi: true}, function(err, result) {});
		
		matfiledata = {
			    
				"@": {
						"xmlns:motPST" : "http://pcs.motorola.com/PST"
				},
				"carrier": itema.CARRIER_NAME,
				"carrierCode":itema.CARRIER_ID,
				"version":v,
				"lastUpdated": new Date(),
			    
				"phoneModels": {
					"phoneModel": {
						"@": {
								"name": "A1000/SE5056AXXW8",
								"technology": "WCDMA",
								"motoServiceMKTName": ""
						},				
						"phoneIDString": {
							"@": {
								"latest_version": "8553"
							},
							"stringValue": {
								"@": {
									"config": "8553",
									"flex": "SE5056AE8W8013",
									"firmware": "AP_51.14.15_BP_2A.35.07P",
									"blur": "",
									"fingerPrint": "",
									"bootloader": "01.02.11 (APB1003)",
									"buffer1": "",
									"buffer2": "",
									"productName": ""
								}
							}
						},
						"mototriage": {
							"recipes": {
	            				"recipe": {
									"@": {
										"id": "223",
										"usecase": itema.USECASE_NAME,
										"default": "true"
									},
								"steps": {
									"Step": {
										"@": {
											"type": "CFILE",
											"fileName": itema.RECIPE_NAME,
											"fileURL": itema.RECIPE_URL
										}
									}
								
								}
								
								}
							}
						},
						"Image": {
							"@":{
								"type": "DEVICEIMAGEFILE",
								"fileName": "",
								"fileURL": ""
							}
						},
						"Configuration": {
							"@":{
								"type": "DEVICECONFIGFILE",
								"fileName": itemj.JSON_NAME,
								"fileURL": itemj.JSON_URL
							}
						}
					}
				}
			  
			};
// end of matfiledata
		
		// to console the xml file
		console.log("matfiledata" + matfiledata);
		//console.log(js2xmlparser("xml", matfiledata));
		 matfile = js2xmlparser("xml", matfiledata);   	//to get xml file
		 console.log(matfile);
		 
		 
		 
		 collectionCARRIER_MATRIX.update({PMAID:PMid}, {$set:{MATRIX_FILE:matfile}}, {w:1, multi: true}, function(err, result) {});
		 console.log("matrix updated in db");
		 
		 // TO download here too sensitive
		 
		
			//var fn = "mat"+".xml";
			 //var hello = "Hello, world";
		 	  res.setHeader('Content-disposition', 'attachment; filename=matrixfile' );
		 	  res.setHeader('Content-type', 'text/plain');
		 	  res.charset = 'UTF-8';
		 	  res.write(matfile);
		 	  console.log("file written");
		 	  res.end();
			//}); 
		 

	});
	
	});
		
	});
	});
	
};


exports.downloadsuccess = function(res, req){
	res.render('downloadsuccess', {user: req.user});
	};
