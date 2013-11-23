var MochaTestRunner = function(testOptions, testMonitor){
	this.start = function(){
		testMonitor.passed();
	};
};

module.exports = MochaTestRunner;