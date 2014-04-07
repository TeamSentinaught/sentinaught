var MochaTestRunner = require('./mocha-test-runner'),
	FileRepository = require('./FileRepository'),
	path = require('path'),
	SourceFile = require('./source-file');

var Sentinaught = function(sentinaughtDisplay){
	var validFilesSpecification = new ValidFilesSpecification(),
		noSourceFilesSpecification = new NoSourceFilesSpecification(),
		testRunnerMonitor = new TestRunnerMonitor(sentinaughtDisplay);

	this.run = function(options){
		if(!options.tests){
			throw new Error("No Tests Specified");
		}
		var getFileOptions = {recursive: options.recursive, name: "*.js"},
			fileRepository = new FileRepository(getFileOptions),
			files = {
				tests : fileRepository.get(options.tests),
				src : fileRepository.get(options.src)
			};

		if (validFilesSpecification.isSatisifiedBy(files)){
			runMutatation(files);
		}
		else{
			if (noSourceFilesSpecification.isSatisifiedBy(files)){
				sentinaughtDisplay.passed();
			}
			else {
				sentinaughtDisplay.failed();
			}
		}
	};

	function runMutatation(files){
		var fileToMutate = files.src[0];	
		if(!!fileToMutate){
			var fileToMutatePath = path.resolve(fileToMutate);
			require(fileToMutatePath);
			require.cache[fileToMutatePath].exports = function(){};
		}
		new MochaTestRunner(files, testRunnerMonitor).start();
	}
};

var TestRunnerMonitor = function(display){
	this.passed = function(){
		display.failed();
	};
	this.failed = function(){
		display.passed();
	};
};

var ValidFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.tests.length > 0;
	};
};

var NoSourceFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.src.length === 0;
	};
};

module.exports = Sentinaught;