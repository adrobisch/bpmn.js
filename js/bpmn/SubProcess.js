define(["bpmn/util/JSClass", "bpmn/Activity", "bpmn/FlowElementsContainer", "bpmn/Package"], function (jsclass, Activity, FlowElementsContainer, Package) {
  var subProcess = {
    include: [FlowElementsContainer],

    tag : "subProcess",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var SubProcessClass = new jsclass.Class(Activity, subProcess);
  Package.registerClass(SubProcessClass);
  return SubProcessClass;
});