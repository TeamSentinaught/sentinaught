var fs = require('fs'),
	path = require('flavored-path'),
	Specification = require('./FileSpecification'),
	_ = require('underscore');

var FileRepository = function(location){

	function get(options){
		options = options || {};
		var root = path.normalize(location);
		return getDirectoryFiles(root,options.recursive);
	}

	function getDirectoryFiles(directory,recursive){
		var directory_items = fs.readdirSync(directory);
		var files = [];
		_.each(directory_items,function(directory_item){
			directory_item =  path.join(directory,directory_item);
			if(FileSpecification.isSatisfiedBy(directory_item)){
				files.push(directory_item);
			}else if(recursive){
				var subfolderFiles = getDirectoryFiles(directory_item);
				files = files.concat(subfolderFiles);
			}
		});
		return files;
	}

	return {
		get: get
	};
};

module.exports = FileRepository;