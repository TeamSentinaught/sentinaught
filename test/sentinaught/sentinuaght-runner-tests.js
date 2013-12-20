var rewire = require('rewire'),
	sentinaught = rewire('../../lib/sentinaught'),
	assert = require('assert');

require('chai').should();


test("When running sentinaught with test options, Then Mocha Test runner runs the test files from file repository",function(done){
	var testFiles = ['hello','world'],
		testFilesFolder = "./tests";
	sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(){
			if(fileLocation === testFilesFolder){
				return testFiles;	
			}
		};
	});

	sentinaught.__set__('MochaTestRunner',function(testOptions){
		testOptions.tests.should.deep.equal(testFiles);
		done();
	});

	sentinaught({tests:testFilesFolder});
});


test("when running sentinaught without any test options, Then no test options exception thrown",function(){
	assert.throws(function(){
		sentinaught({});
	},/No Tests Specified/);

});