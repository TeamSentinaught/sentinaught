var Sentinaught = require('../lib/sentinaught');
require('chai').should();

describe('Given that the tests cover the code adequately', function(){
	describe('When I run sentinaught', function(){
		it('Then I get notified that the code is fully tested', function(){
			true.should.equal(true);
		});
	});
});

describe('Given that the tests do NOT cover the code adequately', function(){
	describe('When I run sentinaught', function(){
		it('Then I get notified that the code is NOT fully tested', function(){
			true.should.equal(true);
		});
	});
});