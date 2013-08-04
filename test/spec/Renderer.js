/**
 * Renderer spec
 */

define(["bpmn/util/Serializer", "bpmn/editor/Renderer", "dojo/request", "dojo/ready"], function (Serializer, Renderer, request, ready) {

  return describe("Renderer", function () {

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

    describe("simple rendering", function () {

      function checkRenderXorModel(testData) {
        var definitions = new Serializer().fromXML(testData.testXml);
        ready(function () {
          new Renderer(definitions).render({
            container: "test",
            scale: 1
          });
        });
      };

      it("should render xor model", load("data/test-xor.bpmn", checkRenderXorModel));
    });

  });
});