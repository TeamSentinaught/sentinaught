/*jshint expr: true */
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
		this.start = function(){};
		testOptions.tests.should.deep.equal(testFiles);
		done();
	});

	sentinaught({tests:testFilesFolder});
});

test("When running sentinaught with test options, Then Mocha Test runner should start",function(done){
	var testFilesFolder = "./tests";
	sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(){
			return [];
		};
	});

	sentinaught.__set__('MochaTestRunner',function(testOptions){
		this.start = function(){
			done();
		};
	});

	sentinaught({tests:testFilesFolder});
});

test("When running sentinaught with test options, Then file repository should have recursive option set",function(done){
	sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(options){
			options.recursive.should.be.true;
			done();
		};
	});
	sentinaught.__set__('MochaTestRunner',function(){
		this.start = function(){};
	});

	sentinaught({tests:'./', recursive:true});
});

test("When running sentinaught with test options, Then file repository should only pick up js files",function(done){
	sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(options){
			options.name.should.be.equal('*.js');
			done();
		};
	});
	sentinaught.__set__('MochaTestRunner',function(){
		this.start = function(){};
	});

	sentinaught({tests:'./', recursive:true});
});


test("when running sentinaught without any test options, Then no test options exception thrown",function(){
	assert.throws(function(){
		sentinaught({});
	},/No Tests Specified/);

});