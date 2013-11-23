var Mocha = require('mocha');

var MochaTestRunner = function(testOptions, testMonitor){
	var mocha = new Mocha();
	mocha.addFile(testOptions.tests[0]);

	this.start = function(){
		var testRunResults = new TestRunResults(testMonitor),
			runner = mocha.run(testRunResults.publishResults);
		runner.on('fail', function(){
			testRunResults.recordFailure();
		});
	};
};

var TestRunResults = function(testMonitor){
	var hasFailed = false;
	
	this.recordFailure = function(){
		hasFailed = true;
	};

	this.publishResults = function(){
		if (hasFailed){
			testMonitor.failed();
		}
		else {
			testMonitor.passed();
		}
	};
};

module.exports = MochaTestRunner;