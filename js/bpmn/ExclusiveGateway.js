define(["bpmn/util/JSClass", "bpmn/Gateway", "bpmn/Package"], function (jsclass, Gateway, Package) {
  var exclusiveGateway = {
    tag : "exclusiveGateway",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var ExclusiveGateway = new jsclass.Class(Gateway, exclusiveGateway);
  Package.registerClass(ExclusiveGateway);
  return ExclusiveGateway;
});