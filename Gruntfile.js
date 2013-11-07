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
		gitcommit: {
			your_target: {
				options:{
					message: message
				},
				src: ['.']
			}
		}, 
		shell: {
			push_it_real_bad: {
				command: 'git push'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-shell');


	grunt.registerTask('test', ['mochaTest','jshint']);
	grunt.registerTask('default',['test','gitcommit', 'shell:push_it_real_bad']);
};