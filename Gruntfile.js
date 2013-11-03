module.exports = function (grunt) {
	var common = grunt.file.readJSON('utils/build/includes/common.json'),
		extras = grunt.file.readJSON('utils/build/includes/extras.json'),
		canvas = grunt.file.readJSON('utils/build/includes/canvas.json'),
		css3d = grunt.file.readJSON('utils/build/includes/css3d.json'),
		webgl = grunt.file.readJSON('utils/build/includes/webgl.json'),
		math = grunt.file.readJSON('utils/build/includes/math.json'),
		banner = '// three.js - http://github.com/mrdoob/three.js \n';

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		concat: {
			common: {
				src: common.concat(extras),
				dest: 'build/three.js'
			},
			canvas: {
				src: canvas,
				dest: 'build/three-canvas.js'
			},
			css3d: {
				src: css3d,
				dest: 'build/three-css3d.js'
			},
			webgl: {
				src: webgl,
				dest: 'build/three-webgl.js'
			},
			extras: {
				src: ['utils/build/externs/extras.js'].concat(extras),
				dest: 'build/three-extras.js'
			},
			math: {
				src: math,
				dest: 'build/three-math.js'
			},
			max: {
				src: ['utils/build/externs/examples.js'].concat(common, extras),
				dest: 'build/three-max.js'
			}
		},

		uglify: {
			options: {
				banner: banner
			},
			common: {
				files: {
					'build/three.min.js': 'build/three.js'
				}
			},
			canvas: {
				files: {
					'build/three-canvas.min.js': 'build/three-canvas.js'
				}
			},
			css3d: {
				files: {
					'build/three-css3d.min.js': 'build/three-css3d.js'
				}
			},
			webgl: {
				files: {
					'build/three-webgl.min.js': 'build/three-webgl.js'
				}
			},
			extras: {
				files: {
					'build/three-extras.min.js': 'build/three-extras.js'
				}
			},
			math: {
				files: {
					'build/three-math.min.js': 'build/three-math.js'
				}
			},
			max: {
				files: {
					'build/three-max.min.js': 'build/three-max.js'
				}
			}
		},

		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: ["pkg"],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json', 'build/three.min.js', 'build/three.js', 'src/Three.js'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin dev',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},

		replace: {
			version: {
				src: ['src/Three.js'],
				overwrite: true,
				replacements: [{
					from: /REVISION: '[^']+'/,
					to: "REVISION: 'v<%= pkg.version %>'"
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['build:common']);
	grunt.registerTask('build:common', ['concat:common', 'uglify:common']);
	grunt.registerTask('build:canvas', ['concat:canvas', 'uglify:canvas']);
	grunt.registerTask('build:css3d', ['concat:css3d', 'uglify:css3d']);
	grunt.registerTask('build:webgl', ['concat:webgl', 'uglify:webgl']);
	grunt.registerTask('build:extras', ['concat:extras', 'uglify:extras']);
	grunt.registerTask('build:math', ['concat:math', 'uglify:math']);
	grunt.registerTask('build:max', ['concat:max', 'uglify:max']);
	grunt.registerTask('build:all', ['build:common', 'build:canvas', 'build:css3d', 'build:webgl', 'build:extras', 'build:math', 'build:max']);

	grunt.registerTask('release', ['replace:version', 'default','bump-commit']);
	grunt.registerTask('release:patch', ['bump-only:patch','release']);
	grunt.registerTask('release:minor', ['bump-only:minor','release']);
	grunt.registerTask('release:major', ['bump-only:major','release']);
};