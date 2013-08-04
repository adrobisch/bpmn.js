define(["dojo/_base/declare", "bpmn/Gateway", "bpmn/Package"], function (declare, Gateway, Package) {
  var parallelGateway = {
    tag : "parallelGateway",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.ParallelGateway", Gateway, parallelGateway));
});