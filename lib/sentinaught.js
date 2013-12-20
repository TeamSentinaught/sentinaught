var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

module.exports = function(options){
	if(!options.tests){
		throw new Error("No Tests Specified");
	}
	var fileRepository = new FileRepository(options.tests),
		testFiles = fileRepository.get();
	new MochaTestRunner({tests:testFiles});
};
