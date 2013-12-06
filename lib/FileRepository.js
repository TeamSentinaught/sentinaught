var fs = require('fs'),
	PathBuilder = require('./PathBuilder'),
	_ = require('underscore');


var FileRepository = function(location){
	var path = new PathBuilder(location);

	this.get = function(){
		var files = fs.readdirSync(path.base());
		return _.map(files,function(file){
			return path.build(file);
		});
	};
};



module.exports = FileRepository;