define(["dojo/_base/declare", "bpmn/FlowNode", "bpmn/Package"], function (declare, FlowNode, Package) {
  var activity = {
    tag : "activity",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.Activity", FlowNode, activity));
});