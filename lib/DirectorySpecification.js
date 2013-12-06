var fs = require('fs');

var DirectorySpecification = {
	isSatisfiedBy: function(node){
		return fs.statSync(node).isDirectory();
	}
};

module.exports = DirectorySpecification;