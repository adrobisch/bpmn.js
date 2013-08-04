define(["dojo/_base/declare", "bpmn/CallableElement", "bpmn/FlowElementsContainer", "bpmn/Package"], function (declare, CallableElement, FlowElementsContainer, Package) {
  var process = {
    tag : "process",

    constructor : function () {
      this.addAttribute({ name : "isExecutable", containment : true, type : "boolean"});
    }
  };

  return Package.registerClass(declare("bpmn.Process", [FlowElementsContainer, CallableElement], process));
});