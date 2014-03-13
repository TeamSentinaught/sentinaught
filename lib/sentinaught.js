var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

var Sentinaught = function(){
	this.run = function(options){
		if(!options.tests){
			throw new Error("No Tests Specified");
		}
		var fileRepository = new FileRepository(options.tests),
			testFiles = fileRepository.get({recursive: options.recursive, name: "*.js"});
		
		var testMonitor = {
			failed: function(){ console.log("Failed");},
			passed: function(){ console.log("Passed");}
		};

		new MochaTestRunner({tests:testFiles},testMonitor).start();
	};
};

module.exports = Sentinaught;