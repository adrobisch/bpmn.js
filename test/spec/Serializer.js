/**
 * Serializer spec
 */

define(["bpmn/util/Serializer", "dojo/request", "dojo/_base/lang"], function (Serializer, request, lang) {

  return describe("Serializer", function () {

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

    describe("deserialize", function () {

      function checkDeserialize(testData) {
        expect(testData.testXml).toBeDefined();

        var definitions = new Serializer().fromXML(testData.testXml);
        console.log(definitions);

        expect(definitions).toBeDefined();
        expect(definitions.process().length).toBe(1);
        expect(definitions.process()[0].isExecutable()).toBe(false);
        expect(definitions.process()[0].flowElements()[0].isInstanceOf(bpmn.StartEvent)).toBe(true);

        var startEventBounds = definitions.process()[0].flowElements()[0].getBounds();
        var subProcess = definitions.process()[0].flowElements()[2];

        var startEvent = definitions.index.item("sid-04A494EF-7D56-4E81-80D9-7F89CDC2ACF4");
        expect(startEvent.outgoing().length).toBe(1);

        var parallelGateway = definitions.index.item("sid-6E6B3941-46F9-4E74-9288-FA20CFF70A1E");
        expect(parallelGateway.incoming().length).toBe(2);

        expect(startEventBounds.x()).toBe(91);
        expect(startEventBounds.y()).toBe(181);
        expect(startEventBounds.width()).toBe(30);
        expect(startEventBounds.height()).toBe(30);

        expect(definitions.process()[0].flowElements().length).toBe(20);
        expect(subProcess.flowElements().length).toBe(5);
      };

      it("should deserialize from BPMN XML", load("data/test-subprocess.bpmn", checkDeserialize));

      function checkPrefixed(testData) {
        expect(testData.testXml).toBeDefined();

        definitions = new Serializer().fromXML(testData.testXml);
        console.log("prefixed", definitions);

        expect(definitions).toBeDefined();
        expect(definitions.process().length).toBe(1);
        expect(definitions.process()[0].isExecutable()).toBe(undefined);
        expect(definitions.process()[0].flowElements().length).toBe(7);
      };

      it("should deserialize from prefixed BPMN XML", load("data/test-prefixed.bpmn", checkPrefixed));

    });

  });
});