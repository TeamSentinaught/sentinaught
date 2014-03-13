var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

var Sentinaught = function(testMonitor){
	var validFilesSpecification = new ValidFilesSpecification();

	this.run = function(options){
		if(!options.tests){
			throw new Error("No Tests Specified");
		}
		var getFileOptions = {recursive: options.recursive, name: "*.js"},
			fileRepository = new FileRepository(options.tests),
			srcRepository = new FileRepository(options.src),
			files = {
				tests : fileRepository.get(getFileOptions),
				src : srcRepository.get(getFileOptions)
			};

		if (validFilesSpecification.isSatisifiedBy(files)){
			testMonitor.failed();
		}
		else{
			new MochaTestRunner({tests: files.tests},testMonitor).start();
		}
	};
};

var ValidFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.tests.length === 0 && files.src.length > 0;
	};
};

module.exports = Sentinaught;