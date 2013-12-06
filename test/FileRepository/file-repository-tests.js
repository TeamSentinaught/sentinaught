var rewire = require('rewire'),
	FileRepository = rewire('../../lib/FileRepository'),
	path = require('flavored-path');
require('chai').should();

test("When Given a path with multiple files, Then an array of files is returned with a full path",function(){
	var fileLocation = "C:\\workspace\\myProject",
		fileName = "test.js",
		fileName2 = "test2.js",
		fileNamefullFilePath = path.join(fileLocation,fileName),
		fileName2fullFilePath = path.join(fileLocation,fileName2),
		expectedFiles = [fileNamefullFilePath,fileName2fullFilePath];

	FileRepository.__set__("fs",{
		readdirSync : function(path){
			return [fileName,fileName2];
		}
	});

	fileRepository = new FileRepository(fileLocation);
	files = fileRepository.get();
	files.should.deep.equal(expectedFiles);
});

test("When given a path, Then the files are returned from the correctly formatted path in the system",function(done){
	var fileLocation = "~/workspace/myProject",
		formattedFileLocation = path.normalize(fileLocation);
	FileRepository.__set__("fs",{
		readdirSync : function(path){
			path.should.equal(formattedFileLocation);
			done();
		}
	});

	new FileRepository(fileLocation).get();
});