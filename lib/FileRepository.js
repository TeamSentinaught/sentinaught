var fs = require('fs'),
	path = require('flavored-path'),
	DirectorySpecification = require('./DirectorySpecification'),
	_ = require('underscore');

var FileRepository = function(location){

	function get(){
		var root = path.normalize(location);
		return _.flatten(getDirectoryFiles(root));
	}

	function getDirectoryFiles(directory){
		var directory_items = fs.readdirSync(directory);
		return _.map(directory_items,function(directory_item){
			directory_item =  path.join(directory,directory_item);
			if(DirectorySpecification.isSatisfiedBy(directory_item)){
				return getDirectoryFiles(directory_item);
			}
			return directory_item;
		});
	}

	return {
		get: get
	};
};

module.exports = FileRepository;