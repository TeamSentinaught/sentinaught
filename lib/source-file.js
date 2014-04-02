var SourceFile = function(sourceFileName){
	process.emit('SourceFileCreated', {
		name : sourceFileName
	});
};

module.exports = SourceFile;