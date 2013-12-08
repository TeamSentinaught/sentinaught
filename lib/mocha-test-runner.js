var Mocha = require('mocha'),
	path = require('path');

var MochaTestRunner = function(testOptions, testMonitor){
	var DISABLE_OUTPUT_REPORTER = 'base',
		mocha = new Mocha({reporter: DISABLE_OUTPUT_REPORTER});
	
	function initialize(){
		var count = 0;
		for(count; count < testOptions.tests.length; count++){
			var testFile = testOptions.tests[count];
			forceReloadOfTestByRemovingFromRequireCache(testFile);
			mocha.addFile(testFile);
		}
	}

	function forceReloadOfTestByRemovingFromRequireCache(file){
		var fullFilePath = path.resolve(file);
		delete require.cache[fullFilePath];
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