define(["dojo/_base/declare", "bpmn/BaseElement", "bpmn/FlowElement"], function (declare, BaseElement, FlowElement) {
  var flowElementsContainer = {
    constructor : function () {
      this.addReference({ name : "flowElements", containment : true, type : FlowElement});
    }
  };

  return declare("bpmn.FlowElementsContainer", BaseElement, flowElementsContainer);
});