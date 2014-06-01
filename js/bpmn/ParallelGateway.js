define(["bpmn/util/JSClass", "bpmn/Gateway", "bpmn/Package"], function (jsclass, Gateway, Package) {
  var parallelGateway = {
    tag : "parallelGateway",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var ParallelGatewayClass = new jsclass.Class(Gateway, parallelGateway);
  Package.registerClass(ParallelGatewayClass);
  return ParallelGatewayClass;
});