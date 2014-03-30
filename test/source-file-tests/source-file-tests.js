require('chai').should();

test('When a source file is created Then it notifies the virus of the source file created', function(done){
	var sourceFileName = './TestSourceFile.js';
	process.on('SourceFileCreated', function(sourceFile, contents){
		sourceFile.should.equal(sourceFileName);
		done();
	});
	new SourceFile(sourceFileName);
});

var SourceFile = function(sourceFileName){
	process.emit('SourceFileCreated', sourceFileName);
};