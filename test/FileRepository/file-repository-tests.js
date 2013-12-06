var rewire = require('rewire'),
	FileRepository = rewire('../../lib/FileRepository'),
	path = require('flavored-path');
require('chai').should();


test("When Given a path with one file, Then a single file is returned with a full path",function(){
	var fileLocation = "C:\\workspace\\myProject",
		fileName = "test.js",
		fullFilePath = path.join(fileLocation,fileName);

	FileRepository.__set__("fs",{
		readdirSync : function(path){
			return [fileName];
		}
	});
	fileRepository = new FileRepository(fileLocation);
	files = fileRepository.get();
	files[0].should.equal(fullFilePath);
});
