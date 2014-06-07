var anymatch = require('anymatch'),
	path = require('flavored-path'),
	DirectoryFileRepository = require('./DirectoryFileRepository'),
	_ = require('underscore');

var FileRepository = function(options){
	options = options || {};

	this.get = function(fileLocation){	
		var query = "**/**/" + (options.name || "*");
		var root = path.normalize(fileLocation);
		var files = new DirectoryFileRepository(fileLocation).get(options.recursive);
		return _.filter(files,function(fileName){
			return anymatch(query,fileName);
		});
	};

};

module.exports = FileRepository;