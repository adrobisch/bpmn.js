define(["bpmn/util/JSClass", "bpmn/BaseElement", "bpmn/FlowElement"], function (jsclass, BaseElement, FlowElement) {
  var flowElementsContainer = {
    initialize : function () {
      this.callSuper();
      this.addReference({ name : "flowElements", containment : true, type : FlowElement});
    },
    init: function () {
      this.callSuper();
    }
  };

  return new jsclass.Module(flowElementsContainer);
});