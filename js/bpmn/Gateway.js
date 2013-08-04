define(["dojo/_base/declare", "bpmn/FlowNode", "bpmn/Package"], function (declare, FlowNode, Package) {
  var gateway = {
    tag : "gateway",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.Gateway", FlowNode, gateway));
});