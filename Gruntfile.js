module.exports = function(grunt) {
	var message = grunt.option('message');
	console.log("message: ",message)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ["./test/**/*.js","./lib/**/*.js"]
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'nyan',
					recursive: true
				},
				src: ["test/**/*.js"]
			}
		},
		git_deploy: {
			your_targets: {
				options:{
					url: 'git@github.com:iainjmitchell/sentinaught.git',
					message: message
				},
				src: './'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-git-deploy');

	grunt.registerTask('test', ['mochaTest','jshint']);
	grunt.registerTask('default',['test','git_deploy']);
};