var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

var Sentinaught = function(testMonitor){
	this.run = function(options){
		if(!options.tests){
			throw new Error("No Tests Specified");
		}
		var fileRepository = new FileRepository(options.tests),
			testFiles = fileRepository.get({recursive: options.recursive, name: "*.js"});

		new MochaTestRunner({tests:testFiles},testMonitor).start();
	};
};

module.exports = Sentinaught;