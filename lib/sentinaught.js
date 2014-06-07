var MochaTestRunner = require('./mocha-test-runner'),
	FileRepository = require('./FileRepository'),
	path = require('path'),
	SourceFile = require('./source-file');

var GET_FILE_OPTIONS = {recursive: true, name: "*.js"};

var Sentinaught = function(sentinaughtDisplay){
	var mutationTestFactory = new MutationTestFactory(sentinaughtDisplay),
		fileRepository = new FileRepository(GET_FILE_OPTIONS);

	this.run = function(options){
		var files = {
				tests : fileRepository.get(options.tests),
				src : fileRepository.get(options.src)
			};
		mutationTestFactory.create(files).start();
	};
};

var MutationTestFactory = function(sentinaughtDisplay){
	var moreThanOneTestFileSpecification = new MoreThanOneTestFileSpecification();

	this.create = function(files){
		if (moreThanOneTestFileSpecification.isSatisifiedBy(files.tests)){
			return new MutationTest(sentinaughtDisplay, files);
		}
		return new InvalidMutationTest(sentinaughtDisplay, files);
	};
};

var MutationTest = function(sentinaughtDisplay, files){
	var testRunMonitor = new TestRunMonitor(sentinaughtDisplay);

	this.start = function(){
		var fileToMutate = files.src[0],
			fileToMutatePath = path.resolve(fileToMutate);
		require(fileToMutatePath);
		require.cache[fileToMutatePath].exports = function(){};
		new MochaTestRunner(files, testRunMonitor).start();
	};
};

var InvalidMutationTest = function(sentinaughtDisplay, files){
	var noSourceFilesSpecification = new NoSourceFilesSpecification();

	this.start = function(){
		if (noSourceFilesSpecification.isSatisifiedBy(files)){
			sentinaughtDisplay.passed();
		}
		else {
			sentinaughtDisplay.failed();
		}
	};
};

var TestRunMonitor = function(display){
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