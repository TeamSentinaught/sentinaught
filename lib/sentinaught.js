var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

module.exports = function(options){
	var fileRepository = new FileRepository(options.tests),
		testFiles = fileRepository.get();
	new MochaTestRunner({tests:testFiles});
};
