#! /usr/bin/env node
var sentinaught = require('../lib/sentinaught'),
	sentinaughtOptions = require('commander');


sentinaughtOptions
	.version('0.0.1')
	.parse(process.argv);

sentinaught(sentinaughtOptions);



