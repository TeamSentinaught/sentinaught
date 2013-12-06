var anymatch = require('anymatch'),
	path = require('flavored-path'),
	DirectoryFileRepository = require('./DirectoryFileRepository'),
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

module.exports = FileRepository;