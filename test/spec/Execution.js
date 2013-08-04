/**
 * Serializer spec
 */

define(["bpmn/util/Serializer", "bpmn/execution/Instance", "dojo/request", "dojo/_base/lang", "dojo/Deferred", "dojo/topic"], function (Serializer, Instance, request, lang, Deferred, topic) {

  describe("Deferred", function () {
    it("should chain callbacks", function () {
      var d = new Deferred();
      var test = [1,2];
      var thenLog = [];

      test.map(function (value){
        d.promise.then(function () {
          thenLog.push(value);
        });
      }, this);

      d.resolve();
      expect(thenLog).toEqual([1,2]);
    })
  });

  return describe("Execution", function () {

    var wrapRun = function (testData, runFunction) {
      return function () {
        runFunction(testData);
      };
    };

    var load = function (modelPath, runsFunction) {
      return function () {
        var loaded = false;
        var testData = {};

        request(modelPath).then(function (data) {
          loaded = true;
          testData.testXml = data;
        });

        waitsFor(function () {
          return loaded;
        }, "loading never completed", 5000);

        runs(wrapRun(testData, runsFunction));
      }
    };

    describe("xor execution", function () {

      function checkXor(testData) {
        expect(testData.testXml).toBeDefined();

        var definitions = new Serializer().fromXML(testData.testXml);

        var path15Log = [];
        var path13Log = [];

        var configuration = {
          "enter" : function (node) {
            path15Log.push(node.id());
          },

          "leave" : function (node) {
            console.log("leave called", node.id());
          },

          "SequenceFlow_15" : function (instance) {
            return instance.variables.var1 === 42;
          }
        };

        var instance = new Instance(definitions, configuration);
        instance.start("StartEvent_1", {"var1" :  42}).then(function () {
          expect(path15Log).toEqual([ 'ServiceTask_3', 'ExclusiveGateway_1', 'ServiceTask_5', 'ExclusiveGateway_2', 'ServiceTask_2', 'EndEvent_1' ]);
        });

        configuration["SequenceFlow_15"] = function () {return false;};
        configuration["SequenceFlow_13"] = function () {return true;};
        configuration["enter"] = function (node) {path13Log.push(node.id())};

        var instance = new Instance(definitions, configuration);
        instance.start("StartEvent_1", {"var1" :  42}).then(function () {
          expect(path13Log).toEqual([ 'ServiceTask_3', 'ExclusiveGateway_1', 'ServiceTask_4', 'ExclusiveGateway_2', 'ServiceTask_2', 'EndEvent_1' ]);
        });
      };

      it("should evaluate instance variable", load("data/test-xor.bpmn", checkXor));
    });


    describe("parallel execution", function () {

      function checkParallel(testData) {
        expect(testData.testXml).toBeDefined();

        var definitions = new Serializer().fromXML(testData.testXml);

        var parallelLog = [];
        var done = false;
        var serviceEntered = false;

        var configuration = {
          "leave" : function (node) {
            parallelLog.push(node.id());
          },
          "ServiceTask_1" : function (context) {
            setTimeout(function () {
              context.promise.resolve();
            }, 100);
          }
        };

        // subscribe before start, if no config there, its resolved immediately
        topic.subscribe("flow:enter:ServiceTask_1", function () {
          serviceEntered = true;
        });

        topic.subscribe("flow:leave:ParallelGateway_2", function () {
          done = true;
        });

        var instance = new Instance(definitions, configuration);
        instance.start("StartEvent_1");

        waitsFor(function() {
          return done == true;
        }, "Execution never completed", 5000);

        runs(function () {
          expect(parallelLog).toEqual([ 'StartEvent_1', 'ServiceTask_1', 'ParallelGateway_1', 'ServiceTask_2', 'ServiceTask_3', 'ParallelGateway_2' ]);
          expect(serviceEntered).toBe(true);
        });

      };

      it("should join paths", load("data/test-and.bpmn", checkParallel));
    });

  });
});