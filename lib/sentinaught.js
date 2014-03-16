var MochaTestRunner = require('./mocha-test-runner.js'),
	FileRepository = require('./FileRepository.js');

var Sentinaught = function(sentinaughtDisplay){
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
			sentinaughtDisplay.failed();
		}
		else{
			var fileSystem = require('fs'),
				fileToMutate = files.src[0];
			if (!!fileToMutate){
				fileSystem.readFile(fileToMutate, 'utf8', function(error, data){
					var original = data,
						new_file = 'module.exports = function(){};';

					fileSystem.writeFile(files.src[0], new_file, function(){
						delete require.cache[fileToMutate];
						new MochaTestRunner({tests: files.tests}, {
								passed: function(){
									fileSystem.writeFile(files.src[0], original);
									sentinaughtDisplay.failed();
								},
								failed: function(){
									fileSystem.writeFile(files.src[0], original);
									sentinaughtDisplay.passed();
								}
							}).start();
					});
				});
			}
			else{
				new MochaTestRunner({tests: files.tests},sentinaughtDisplay).start();
			}
		}
	};
};

var ValidFilesSpecification = function(){
	this.isSatisifiedBy = function(files){
		return files.tests.length === 0 && files.src.length > 0;
	};
};

module.exports = Sentinaught;