/*jshint expr: true */
var rewire = require('rewire'),
	Sentinaught = rewire('../../lib/sentinaught'),
	assert = require('assert');

require('chai').should();

var fakeTestMonitor = {
	passes : function(){},
	failed : function(){}
};

test("When running sentinaught with test options, Then Mocha Test runner runs the test files from file repository",function(done){
	var testFiles = ['hello','world'],
		testFilesFolder = "./tests";
	Sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(){
			if(fileLocation === testFilesFolder){
				return testFiles;	
			}else{
				return [];
			}
		};
	});

	Sentinaught.__set__('MochaTestRunner',function(testOptions){
		this.start = function(){};
		testOptions.tests.should.deep.equal(testFiles);
		done();
	});

	new Sentinaught(fakeTestMonitor).run({tests:testFilesFolder});
});

test("When running sentinaught with test options, Then Mocha Test runner should start",function(done){
	var testFilesFolder = "./tests";
	Sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(){
			return [''];
		};
	});

	Sentinaught.__set__('MochaTestRunner',function(testOptions){
		this.start = function(){
			done();
		};
	});

	new Sentinaught(fakeTestMonitor).run({tests:testFilesFolder});
});

test("When running sentinaught with test options, Then file repository should have recursive option set",function(done){
	Sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(options){
			options.recursive.should.be.true;
			done();
			return [];
		};
	});
	Sentinaught.__set__('MochaTestRunner',function(){
		this.start = function(){};
	});

	new Sentinaught(fakeTestMonitor).run({tests:'./', recursive:true});
});

test("When running sentinaught with test options, Then file repository should only pick up js files",function(done){
	Sentinaught.__set__('FileRepository',function(fileLocation){
		this.get = function(options){
			options.name.should.be.equal('*.js');
			done();
			return [];
		};
	});
	Sentinaught.__set__('MochaTestRunner',function(){
		this.start = function(){};
	});

	new Sentinaught(fakeTestMonitor).run({tests:'./', recursive:true});
});


test("when running sentinaught without any test options, Then no test options exception thrown",function(){
	assert.throws(function(){
		new Sentinaught(fakeTestMonitor).run({});
	},/No Tests Specified/);

});