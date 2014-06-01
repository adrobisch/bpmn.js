module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/mocha/**/*.js']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: '.'
        }
      }
    },
    watch: {
      tests: {
        files: ['js/**/*', 'test/**/*', 'example.html'],
        tasks: ['urequire:combined', 'mochaTest']
      }
    },
    uglify: {
      options : {
        mangle : true
      }
    },
    requirejs: {
      compile: {
        options: {
          paths: {
            "jquery" : "../node_modules/jquery/dist/jquery.min",
            "lodash" : "../node_modules/lodash/lodash",
            "sax": '../node_modules/sax/lib/sax',
            "kinetic": '../node_modules/kinetic/kinetic.min',
            "bpmn" : "../lib/bpmn.combined"
          },
          shim: {
            "jquery": {
              exports: "$"
            },
            "lodash" : {
              exports: "_"
            },
            "sax" : {
              exports : "sax"
            },
            "kinetic" : {
              exports: "Kinetic"
            }
          },
          name : "bpmn/Bpmn",
          baseUrl: "./js",
          packages: [
            { name: "bpmn", location: "bpmn"}],
          out: "lib/bpmn.min.js"
        }
      }
    },

    urequire: {
      combined: {
        template: 'combined',
        path: "js/",
        main: 'bpmn/Bpmn',
        dstPath: "lib/bpmn.combined.js"
      },

      combined_minified: {
        template: 'combined',
        banner: 'bpmnjs, License MIT',
        path: "js/",
        main: 'bpmn/Bpmn',
        dstPath: "lib/bpmn.combined.min.js",
        optimize: true
      },

      _defaults: {
        bundle: {
          dependencies: {
            locals: ['sax', 'kinetic', 'jquery', 'lodash'],
            exports: {
              bundle: {
                'sax': 'sax',
                'kinetic': 'Kinetic',
                'jquery': '$',
                'lodash': '_'
              }
            }
          }
        },
        debugLevel: 0,
        verbose: false,
        scanAllow: true,
        allNodeRequires: true,
        noRootExports: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-urequire');

  grunt.registerTask('server', [ 'connect:server'] );
  grunt.registerTask('default', ['urequire:combined', 'mochaTest']);
  grunt.registerTask('dist', ['default', 'urequire:combined_minified', 'requirejs']);
};
