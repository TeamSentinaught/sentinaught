#! /usr/bin/env node
var sentinaught = require('../lib/sentinaught'),
	sentinaughtOptions = require('commander'),
	readJson = require('read-package-json');

 readJson('./package.json',function (error,package) {
	sentinaughtOptions
	.option('-T, --tests <location>','test folder location')
	.version(package.version)
	.parse(process.argv);

	sentinaught(sentinaughtOptions);
 });




