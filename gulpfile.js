var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	git = require('gulp-git');

gulp.task('mocha', function () {
    var mochaRun = mocha({
		reporter: 'nyan',
        ui: 'tdd'
    });

	gulp
		.src('test/**/*.js')
		.pipe(mochaRun);
});

gulp.task('jshint', function(){
	gulp
		.src(['lib/**/*.js', 'test/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint', 'mocha']);

gulp.task('push', function(e){
	var commitMessage = gulp.env.message || 'no commit message';
	gulp
		.src('./.')
		.pipe(git.add())
		.pipe(git.commit(commitMessage))
		.pipe(git.push());
	console.log('push');
});

gulp.task('default', ['test', 'push']);