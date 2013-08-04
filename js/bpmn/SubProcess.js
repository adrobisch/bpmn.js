define(["dojo/_base/declare", "bpmn/Activity", "bpmn/FlowElementsContainer", "bpmn/Package"], function (declare, Activity, FlowElementsContainer, Package) {
  var subProcess = {
    tag : "subProcess",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.SubProcess", [Activity,FlowElementsContainer], subProcess));
});