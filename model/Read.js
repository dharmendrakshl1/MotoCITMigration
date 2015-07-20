/**
 * New node file
 */
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var configDB = require('../config/database.js');
var Schema = mongoose.Schema;
//var RdUser = mongoose.model('Readtext');
//var RdUser =require('../repository/TestCaseDb');
exports.showhomepage = function(req, res) {
	res.render('welcomepage', {
		user : req.user
	});
};

//Akshatha

exports.showloadpage = function(req, res) {
	res.render('loadtestcase', {
		user : req.user
	});
};

exports.uploadtestcase = function(req, res) {
//update to testcase- Status
	
	//var form = req.form;
	// console.log(req.files.upfilename);
	console.log("checking");
	console.log("upload :",req.files);
	console.log(req.files.fileupload.name);
	console.log(req.files.fileupload.path);
	//res.send('upl:' + req.files.fileupload.name);
	//var fname = req.files.upload.name;

	
	fs.readFile(req.files.fileupload.path, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
		
	MongoClient.connect(configDB.url, function(err, db) {
		if(err) { return console.dir(err); }
		var collections = db.collection('testcases');
		collections.update({STATUS:1}, {$set:{STATUS:2}}, {w:1, multi: true}, function(err, result) {});
		collections.update({STATUS:0}, {$set:{STATUS:1}}, {w:1, multi: true}, function(err, result) {});
	
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
		//insert to testcases
		var testcasedocument = {
				ID : 103,
				NAME : 'testcase12',
				STATUS : 0,
				CREATED_BY : userName,
				MODIFIED_BY : userName,
				CREATED_DATE : new Date(),
				MODIFIED_DATE : new Date(),
				TESTCASE_NAME : data
			};
		collections.insert(testcasedocument, {w: 1}, function(err, records){
		 // console.log("Record added as "+records[0]._id);
	
		collections.save(testcasedocument, {w:1}, function(err, records){});
		
		});
		//db.close();
	});
	});
	
	res.render('success',{user:req.user});	
	};


