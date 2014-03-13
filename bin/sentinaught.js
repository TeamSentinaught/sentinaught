#! /usr/bin/env node
var Sentinaught = require('../lib/sentinaught'),
	sentinaughtOptions = require('commander'),
	readJson = require('read-package-json');

 readJson('./package.json',function (error,package) {
	sentinaughtOptions
		.option('-T, --tests <location>','test folder location')
		.option('-r, --recursive','Recurse test folder')
		.version(package.version)
		.parse(process.argv);
	
	new Sentinaught({
		passed : function(){
			console.log('passed :)');
		},
		failed : function(){
			console.log('failed :(');
		}
	}).run(sentinaughtOptions);
 });