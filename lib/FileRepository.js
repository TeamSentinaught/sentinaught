var anymatch = require('anymatch'),
	path = require('flavored-path'),
	DirectoryFileRepository = require('./DirectoryFileRepository'),
	_ = require('underscore');

var FileRepository = function(options){
	options = options || {};

	this.get = function(location1){	
		query = "**/**/" + (options.name || "*");
		var root = path.normalize(location1);
		var files = new DirectoryFileRepository(location1).get(options.recursive);
		return _.filter(files,function(fileName){
			return anymatch(query,fileName);
		});
	};

};

module.exports = FileRepository;