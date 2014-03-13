module.exports = function(name){
	this.sayHello = function(){
		var message = 'hello ' + name;
		return message;
	};
};