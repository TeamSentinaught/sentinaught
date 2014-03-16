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

describe('Given that there are NO tests', function(){
	var NO_TESTS = './integration-tests/noTests';

	describe('And there is source code', function(){	
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
					tests : NO_TESTS,
					src : './integration-tests/src'
				});
			});
		});
	});

	describe('And there is NO source code', function(){
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
					tests : NO_TESTS,
					src : './integration-tests/noSrc'
				});
			});
		});
	});
});

describe('Given that there are tests', function(){
	describe('And they do NOT adequately cover the source code', function(){
		describe('when I run sentinaught', function(){
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
					tests : './integration-tests/fails',
					src : './integration-tests/src'
				});
			});
		});
	});
});