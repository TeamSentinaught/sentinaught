var fs = require('fs');

var FileSpecification = {
	isSatisfiedBy: function(node){
		return fs.statSync(node).isFile();
	}
};

module.exports = FileSpecification;