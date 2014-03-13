var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

var Sentinaught = function(testMonitor){
	this.run = function(options){
		if(!options.tests){
			throw new Error("No Tests Specified");
		}
		var getFileOptions = {recursive: options.recursive, name: "*.js"},
			fileRepository = new FileRepository(options.tests),
			anotherfileRepository = new FileRepository(options.src),
			testFiles = fileRepository.get(getFileOptions),
			srcfiles = anotherfileRepository.get(getFileOptions);

		if (testFiles.length === 0 && srcfiles.length > 0){
			testMonitor.failed();
		}
		else{
			new MochaTestRunner({tests:testFiles},testMonitor).start();
		}
	};
};

module.exports = Sentinaught;