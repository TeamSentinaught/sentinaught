var SourceFile = require('../../lib/source-file');
require('chai').should();

test('When a source file is created Then it notifies the virus of the source file created', function(done){
	var sourceFileName = './TestSourceFile.js';
	process.on('SourceFileCreated', function(sourceFile){
		sourceFile.name.should.equal(sourceFileName);
		done();
	});
	new SourceFile(sourceFileName);
});

