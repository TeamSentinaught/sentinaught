var Mocha = require('mocha');

var MochaTestRunner = function(testOptions, testMonitor){
	var failed = false,
		mocha = new Mocha();
	mocha.addFile(testOptions.tests[0]);

	this.start = function(){
		var runner = mocha.run(end);
		runner.on('fail', function(){
			failed = true;
		});
		runner.on('pass', function(){
			console.log('pass');
		});
	};

	function end(){
		if (failed){
			testMonitor.failed();
		}
		else {
			testMonitor.passed();
		}
	}
};

module.exports = MochaTestRunner;