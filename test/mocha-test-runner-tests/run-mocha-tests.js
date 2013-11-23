var MochaTestRunner = require('../../lib/mocha-test-runner');
require('chai').should();

test('Mocha test run passes when standard ui run against all-okay-standard-ui', function(done){
	var	mockTestMonitor = {
			passed : done,
		},
		testOptions = {
			tests : ['test/mocha-test-runner-tests/dummy-tests/all-okay-standard-ui.js']
		}
		mochaTestRunner = new MochaTestRunner(testOptions, mockTestMonitor);
	mochaTestRunner.start();
});

test('Mocha test run fails when standard ui run against all-bad-standard-ui', function(done){
	var	mockTestMonitor = {
			passed : function(){
				done('Expected test runner failure');
			},
			failed : done
		},
		testOptions = {
			tests : ['test/mocha-test-runner-tests/dummy-tests/all-bad-standard-ui.js']
		}
		mochaTestRunner = new MochaTestRunner(testOptions, mockTestMonitor);
	mochaTestRunner.start();
});