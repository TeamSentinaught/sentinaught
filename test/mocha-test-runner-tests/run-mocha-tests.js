var MochaTestRunner = require('../../lib/mocha-test-runner');
require('chai').should();

test('Mocha test run passes when standard ui run against all-okay-standard-ui', function(done){
	var	testMonitor = {
			passed : done,
		},
		testOptions = {
			tests : ['dummy-tests/all-okay-standard-ui.js']
		}
		mochaTestRunner = new MochaTestRunner(testOptions, testMonitor);
	mochaTestRunner.start();
});