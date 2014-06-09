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
        tasks: ['urequire:combined', 'karma']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false
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
            "fabric": '../node_modules/fabric/dist/fabric',
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
            "fabric" : {
              exports: "fabric"
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
        dstPath: "lib/bpmn.combined.js",
        rootExports: 'Bpmn'
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
            locals: ['sax', 'jquery', 'lodash', 'fabric'],
            exports: {
              bundle: {
                'sax': 'sax',
                'jquery': '$',
                'lodash': '_',
                'fabric': 'fabric'
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
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('server', [ 'connect:server'] );
  grunt.registerTask('default', ['test', 'watch:tests'] );
  grunt.registerTask('test', ['urequire:combined', 'karma', 'mochaTest:test']);
  grunt.registerTask('dist', ['test', 'urequire:combined_minified', 'requirejs']);
};
