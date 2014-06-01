define(["bpmn/util/JSClass", "bpmn/FlowNode", "bpmn/Package"], function (jsclass, FlowNode, Package) {
  var gateway = {
    tag : "gateway",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var GatewayClass = new jsclass.Class(FlowNode, gateway);
  Package.registerClass(GatewayClass);
  return GatewayClass;
});