var Cat = require('../src/Cat');
require('chai').should();

describe('This should fail if mutated', function(){
	it('yes it should', function(){
		var name = Math.random();
		new Cat(name).sayHello().should.equal('hello '+name);
	});
});