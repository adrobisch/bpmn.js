define(["dojo/_base/declare", "bpmn/FlowNode", "bpmn/Package"], function (declare, FlowNode, Package) {
  var event = {
    tag : "event",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.Event", FlowNode, event));
});