var path = require('flavored-path');
var PathBuilder = function(basePath){

	this.base = function(){
		return path.normalize(basePath);
	};

	this.build = function(extraPath){
		return path.join(basePath,extraPath);
	};
};

module.exports = PathBuilder;