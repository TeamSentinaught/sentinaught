var fs = require('fs'),
	FileSpecification = require('./FileSpecification'),
	_ = require('underscore'),
	path = require('flavored-path');

var DirectoryFileRepository = function(directory){
	var root = path.normalize(directory);
	
	this.get = function(recursive){
		return getFiles(root,recursive);
	};

	function getFiles(directory,recursive){
		var directory_items = fs.readdirSync(directory);
		var files = [];
		_.each(directory_items,function(directory_item){
			directory_item =  path.join(directory,directory_item);
			if(FileSpecification.isSatisfiedBy(directory_item)){
				files.push(directory_item);
			}else if(recursive){
				var subfolderFiles = getFiles(directory_item);
				files = files.concat(subfolderFiles);
			}
		});
		return files;
	}
};

module.exports = DirectoryFileRepository;