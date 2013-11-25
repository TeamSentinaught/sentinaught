var Mocha = require('mocha');

var MochaTestRunner = function(testOptions, testMonitor){
	var DISABLE_OUTPUT_REPORTER = 'base',
		mocha = new Mocha({reporter: DISABLE_OUTPUT_REPORTER});
	
	function initialize(){
		var count = 0;
		console.log('new run');
		for(count; count < testOptions.tests.length; count++){
			var testFile = testOptions.tests[count];
			mocha.addFile(testFile);
		}
	}

	this.start = function(){
		var testRunResults = new TestRunResults(testMonitor),
			runner = mocha.run(testRunResults.publishResults);
		runner.on('fail', function(test){
			testRunResults.recordFailure();
		});
	};

	initialize();
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