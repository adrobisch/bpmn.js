module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9000,
          base: '.'
        }
      }
    },
    watch: {
      files: 'src/**/*',
      tasks: ['requirejs']
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
            "sax": 'lib/sax',
            "kinetic":  'lib/kinetic'
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
            { name: "dojo", location: "lib/dojo/dojo" },
            { name: "dojox", location: "lib/dojo/dojox"},
            { name: "bpmn", location: "bpmn"}],
          out: "compiled/bpmn.min.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', [ 'connect:server'] );
  grunt.registerTask('default', ['requirejs']);
};
