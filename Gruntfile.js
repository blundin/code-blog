module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      javascript: ['_site/js/*.js', '!_site/js/*.min.js'],
      modernizr: ['_site/bower_components/modernizr/modernizr.js'],
      css: ['_site/css/*.css', '!_site/css/*.min.css']
    },
    uglify: {
      modernizr: {
        files: {
          '_site/bower_components/modernizr/modernizr.min.js': ['_site/bower_components/modernizr/modernizr.js']
        }
      },
      app: {
      // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
      // runs and build the appropriate src-dest file mappings then, so you
      // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            src: ['_site/js/*.js'], // Actual pattern(s) to match.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '_site/css/',
        src: ['*.css', '!*.min.css'],
        dest: '_site/css/',
        ext: '.min.css'
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      },
      deploy: {
        cmd: './publish.sh'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [ 'exec:build', 'uglify', 'cssmin', 'clean']);
  grunt.registerTask('deploy', [ 'default', 'exec:deploy' ]);
};
