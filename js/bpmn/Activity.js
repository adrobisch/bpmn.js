define(["bpmn/util/JSClass", "bpmn/FlowNode", "bpmn/Package"], function (jsclass, FlowNode, Package) {
  var activity = {
    tag : "activity",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };

  var ActivityClass = new jsclass.Class(FlowNode, activity);
  Package.registerClass(ActivityClass);
  return ActivityClass;
});