define(["dojo/request", "dojo/ready", "bpmn/util/Serializer"], function (request, ready, Serializer) {
  var runWithDefinitions = function (testData, testFunction) {
    return function () {
      ready(function () {
        testFunction(new Serializer().fromXML(testData.testXml));
      });
    };
  };

  var withDefinitions = function (modelPath, testFunction) {
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

      runs(runWithDefinitions(testData, testFunction));
    }
  };

  return {
    withDefinitions : withDefinitions
  };

});