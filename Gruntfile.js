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
      scripts: {
        files: ['src/**/*', 'example.html'],
        tasks: ['urequire:combined', 'requirejs']
      },
      tests: {
        files: ['test/**/*', 'example.html'],
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
            "sax": '../node_modules/sax/lib/sax',
            "kinetic":  '../node_modules/kinetic/kinetic'
          },
          shim: {
            "sax" : {
              exports : "sax"
            },
            "kinetic" : {
              exports : "Kinetic"
            }
          },
          name : "bpmn/Bpmn",
          baseUrl: "./js",
          packages: [
            { name: "dojo", location: "../node_modules/dojo" },
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
            locals: ['dojo', 'sax', 'kinetic'],
            exports: {
              bundle: {
                'sax': 'sax',
                'kinetic': 'Kinetic'
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
