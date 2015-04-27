'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      project: {
          app: ['app'],
          assets: ['<%= project.app %>/assets'],
          css: ['<%= project.assets %>/sass/style.scss']
      },
      sass: {
          dev: {
              options: {
                  style: 'expanded',
                  compass: false
              },
              files: {
                  '<%= project.assets %>/css/style.css':'<%= project.css %>'
              }
          }
      },
      watch: {
          sass: {
              files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
              tasks: ['sass:dev']
          },
          html: {
            files: 'app/index.tpl.html',
            tasks: ['includeSource','wiredep:task']
          }
      },
      includeSource: {
        options: {
          basePath: 'app',
          baseUrl: '/',
          /*
          templates: {
            html: {
              js: '<script src="{filePath}"></script>',
              css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
            }
          }
          */
        },
        myTarget: {
          files: {
            'index.html': 'app/index.tpl.html'
          }
        }
      },
      wiredep: {

        task: {

          // Point to the files that should be updated when
          // you run `grunt wiredep`
          src: [
            'index.html'
          ],

          options: {
            // See wiredep's configuration documentation for the options
            // you may pass:

            // https://github.com/taptapship/wiredep#configuration
          }
        }
      }
    });

    grunt.registerTask('default', [
      'includeSource',
      'wiredep',
      'watch'
    ]);

};
