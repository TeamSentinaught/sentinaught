var fs = require('fs'),
	path = require('flavored-path'),
	_ = require('underscore');

var FileRepository = function(location){
	this.get = function(){
		var files = fs.readdirSync();
		return _.map(files,function(file){
			return path.join(location,file);
		});
	};

};

module.exports = FileRepository;