var MochaTestRunner = require('./mocha-test-runner'),
	FileRepository = require('./FileRepository'),
	path = require('path'),
	SourceFile = require('./source-file');

var Sentinaught = function(sentinaughtDisplay){
	var moreThanOneTestFileSpecification = new MoreThanOneTestFileSpecification(),
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

		if (moreThanOneTestFileSpecification.isSatisifiedBy(files.tests)){
			runMutation(files);
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

	function runMutation(files){
		var fileToMutate = files.src[0],
			fileToMutatePath = path.resolve(fileToMutate);
		require(fileToMutatePath);
		require.cache[fileToMutatePath].exports = function(){};
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

var MoreThanOneTestFileSpecification = function(){
	this.isSatisifiedBy = function(tests){
		return tests.length > 0;
	};
};

var NoSourceFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.src.length === 0;
	};
};

module.exports = Sentinaught;