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

	FileRepository.__set__("fs",new FakeFs([fileName,fileName2]));
	FileRepository.__set__("FileSpecification", new FakeFileSpecification());

	fileRepository = new FileRepository(fileLocation);
	files = fileRepository.get();
	files.should.deep.equal(expectedFiles);
});

test("When given a path, Then the files are returned from the correctly formatted path in the system",function(done){
	var fileLocation = "~/workspace/myProject",
		formattedFileLocation = path.normalize(fileLocation);

	FileRepository.__set__("FileSpecification",new FakeFileSpecification());
	FileRepository.__set__("fs",{
		readdirSync : function(path){
			path.should.equal(formattedFileLocation);
			done();
		}
	});
	new FileRepository(fileLocation).get();
});

test("When given a path and query is recursive, Then all files from subfolders are returned",function(){
	var rootPath = path.normalize("c:\\workspace\\myproject"),
		fileName = "rootTest.js",
		folderName = "some_tests",
		subfolderFileName = "other_tests.js",
		subFolderFullPath = path.join(rootPath,folderName),
		rootFileNameFullPath = path.join(rootPath,fileName),
		subfolderFileNameFullPath = path.join(path.join(rootPath,folderName),subfolderFileName),
		expectedFiles = [rootFileNameFullPath,subfolderFileNameFullPath];

	FileRepository.__set__("fs",{
		readdirSync : function(path){
			if(path === rootPath){
				return [fileName,folderName];	
			}
			return [subfolderFileName];			
		}
	});

	FileRepository.__set__("FileSpecification",new FakeFileSpecification(subFolderFullPath));

	fileRepository = new FileRepository(rootPath);
	files = fileRepository.get({recursive: true});
	files.should.deep.equal(expectedFiles);
});

test("When given a path and query is non recursive, Then all files from subfolders are not returned",function(){
	var rootPath = path.normalize("c:\\workspace\\myproject"),
		fileName = "rootTest.js",
		folderName = "some_tests",
		subfolderFileName = "other_tests.js",
		subFolderFullPath = path.join(rootPath,folderName),
		rootFileNameFullPath = path.join(rootPath,fileName),
		subfolderFileNameFullPath = path.join(path.join(rootPath,folderName),subfolderFileName),
		expectedFiles = [rootFileNameFullPath];

	FileRepository.__set__("fs",{
		readdirSync : function(path){
			if(path === rootPath){
				return [fileName,folderName];	
			}
			return [subfolderFileName];			
		}
	});

	FileRepository.__set__("FileSpecification",new FakeFileSpecification(subFolderFullPath));
	fileRepository = new FileRepository(rootPath);
	files = fileRepository.get({recursive: false});
	files.should.deep.equal(expectedFiles);
});

test("When Given a path with multiple file types and a query for only js files, Then an array of files is returned with a full path for only js files",function(){
	var fileLocation = "C:\\workspace\\myProject",
		fileName = "test.js",
		fileName2 = "data.json",
		fileNamefullFilePath = path.join(fileLocation,fileName),
		expectedFiles = [fileNamefullFilePath];

	FileRepository.__set__("fs",new FakeFs([fileName,fileName2]));
	FileRepository.__set__("FileSpecification", new FakeFileSpecification());

	fileRepository = new FileRepository(fileLocation);
	files = fileRepository.get({name: "*.js"});
	files.should.deep.equal(expectedFiles);
});


var FakeFs = function(files){
	function readdirSync(){
		return files;
	}

	return {
		readdirSync: readdirSync
	};
};

var FakeFileSpecification = function(directory){
	this.isSatisfiedBy = function(path){
		return path !== directory;
	};
};