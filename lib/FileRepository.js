var fs = require('fs'),
	Specification = require('./FileSpecification'),
	anymatch = require('anymatch'),
	_ = require('underscore');

var FileRepository = function(location){

	this.get = function(options){
		options = options || {};
		query = "**/**/" + (options.name || "*");
		var root = path.normalize(location);
		var files = new DirectoryFileRepository(location).get(options.recursive);
		return _.filter(files,function(fileName){
			return anymatch(query,fileName);
		});
	};

};


var path = require('flavored-path');

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

module.exports = FileRepository;