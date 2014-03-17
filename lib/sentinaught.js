var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js'),
	path = require('path');

var Sentinaught = function(sentinaughtDisplay){
	var validFilesSpecification = new ValidFilesSpecification();

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

		if (!validFilesSpecification.isSatisifiedBy(files)){
			if (files.tests.length === 0 && files.src.length === 0){
				sentinaughtDisplay.passed();
			}
			else {
				sentinaughtDisplay.failed();
			}
		}
		else{	
			var fileToMutate = files.src[0];
			if(!!fileToMutate){
				var fileToMutatePath = path.resolve(fileToMutate);
				require(fileToMutatePath);
				require.cache[fileToMutatePath].exports = function(){};
			}
			new MochaTestRunner({tests: files.tests}, {
					passed: function(){
						sentinaughtDisplay.failed();
					},
					failed: function(){
						sentinaughtDisplay.passed();
					}
				}).start();
		}
	};
};

var ValidFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.tests.length > 0;
	};
};

module.exports = Sentinaught;