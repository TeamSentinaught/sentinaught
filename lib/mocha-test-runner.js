module.exports = function(testOptions, testMonitor){
	this.start = function(){
		testMonitor.passed();
	};
};