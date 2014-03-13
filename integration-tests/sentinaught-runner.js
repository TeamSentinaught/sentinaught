var Sentinaught = require('../lib/sentinaught');

describe('Given that the tests cover the code adequately', function(){
	describe('When I run sentinaught', function(){
		it('Then I get notified that the code is fully tested', function(done){
			var mockTestMonitor = {
					passed : function(){
						done();
					},
					failed : function(){
						done('Should have passed');
					}
				};
			new Sentinaught(mockTestMonitor).run({
				tests : './integration-tests/passes/tests',
				src : './integration-tests/src'
			});
		});
	});
});

describe('Given that there are NO tests and there is source code', function(){
	describe('When I run sentinaught', function(){
		it('Then I get notified that the code is NOT fully tested', function(done){
			var mockTestMonitor = {
					passed : function(){
						done('Should have failed');
					},
					failed : function(){
						done();
					}
				};
			new Sentinaught(mockTestMonitor).run({
				tests : './integration-tests/noTests',
				src : './integration-tests/src'
			});
		});
	});
});

describe('Given that there are NO tests and NO source code', function(){
	describe('When I run sentinaught', function(){
		it('Then I get notified that the code is fully tested', function(done){
			var mockTestMonitor = {
					passed : function(){
						done();
					},
					failed : function(){
						done('Should have passed');
					}
				};
			new Sentinaught(mockTestMonitor).run({
				tests : './integration-tests/noTests',
				src : './integration-tests/noSrc'
			});
		});
	});
});