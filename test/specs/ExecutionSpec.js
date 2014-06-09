describe('Execution', function () {
  describe('xor behaviour', function () {
    it('should evaluate instance variable', withData("test/data/test-xor.bpmn", function (bpmnXml) {
          // given
          var definitions = new Bpmn().fromXML(bpmnXml);

          var path15Log = [];
          var path13Log = [];

          var serviceTaskExecuted = false;

          var configuration = {
            "enter": function (node) {
              path15Log.push(node.id());
            },

            "leave": function (node) {
              console.log("leave called", node.id());
            },

            "SequenceFlow_15": function (instance) {
              return instance.variables.var1 === 42;
            },

            "ServiceTask_5": function (instance) {
              serviceTaskExecuted = true;
            }
          };
          // when
          var instance = new Bpmn().instance(definitions, configuration);
          instance.start("StartEvent_1", {"var1": 42}).then(function () {
            // then
            assert.deepEqual(path15Log, [ 'ServiceTask_3', 'ExclusiveGateway_1', 'ServiceTask_5', 'ExclusiveGateway_2', 'ServiceTask_2', 'EndEvent_1']);
            assert.equal(serviceTaskExecuted, true);
          });
          // and
          configuration["SequenceFlow_15"] = function () {
            return false;
          };
          configuration["SequenceFlow_13"] = function () {
            return true;
          };
          configuration["enter"] = function (node) {
            path13Log.push(node.id())
          };
          // when
          instance = new Bpmn().instance(definitions, configuration);
          instance.start("StartEvent_1", {"var1": 42}).then(function () {
            // then
            assert.deepEqual(path13Log, [ 'ServiceTask_3', 'ExclusiveGateway_1', 'ServiceTask_4', 'ExclusiveGateway_2', 'ServiceTask_2', 'EndEvent_1' ]);
          });
        })
    );
  });

  describe("parallel execution", function () {
    it("should join paths", withData("test/data/test-and.bpmn", function (bpmnXml, done) {
      // given
      var definitions = new Bpmn().fromXML(bpmnXml);

      var parallelLog = [];
      var serviceEntered = false;

      var configuration = {
        "enter": function (node) {
          if (node.id() == "ServiceTask_1") {
            serviceEntered = true;
          }
        },

        "leave": function (node) {
          parallelLog.push(node.id());
          if (node.id() == "ParallelGateway_2") {
            assert.deepEqual(parallelLog, [ 'StartEvent_1', 'ServiceTask_1', 'ParallelGateway_1', 'ServiceTask_2', 'ServiceTask_3', 'ParallelGateway_2' ]);
            assert.equal(serviceEntered, true);
            done();
          }
        },
        "ServiceTask_1": function (context) {
          setTimeout(function () {
            context.promise.resolve();
          }, 100);
        }
      };

      // when
      var instance = new Bpmn().instance(definitions, configuration);
      instance.start("StartEvent_1");
    }, false));
  })
});