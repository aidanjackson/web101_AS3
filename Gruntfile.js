// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  /*
  Plugins (replaces need for separate loadNpmTasks)
  ------------------------------------------------------------------------ */
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    jshint: {

        options: {
            reporter: require('jshint-stylish')
        },

        build: ['assets/dev/js/*.js']
    },

    cssmin: {
      target: {
        files: [{
          'assets/dist/css/style.min.css' : ['assets/dev/css/style.css', 'assets/dev/css/norm.css']
        }]
      }
    },

    uglify: {

        build: {
            src: 'assets/js/dev/*.js',
            dest: 'assets/js/dist/scripts.min.js'
        }
    },

    watch: {

        scripts: {
            files: ['assets/js/*.js'],
            tasks: ['jshint', 'uglify'],
            options: {
                spawn: false
            }
        },

        css: {
            files: ['assets/dev/css/*.css'],
            tasks: ['cssmin'],
            options: {
                spawn: false
            }
        },
    },

    browserSync: {

        default_options: {

            bsFiles: {
                src : ['assets/dist/**/*.css', '*.html', '*.svg', 'assets/dist/js/*.{js,json}', 'assets/**/*.{png,jpg,jpeg,gif,webp,svg}'],
            },

            options: {
                watchTask: true,
                server: {
                  baseDir: "./"
                }
            }
        }
    }

  });

  grunt.registerTask('default', ['browserSync', 'jshint', 'uglify', 'cssmin', 'watch']);

};
