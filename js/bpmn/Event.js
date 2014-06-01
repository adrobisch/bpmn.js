define(["bpmn/util/JSClass", "bpmn/FlowNode", "bpmn/Package"], function (jsclass, FlowNode, Package) {
  var event = {
    tag : "event",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };

  var EventClass = new jsclass.Class(FlowNode, event);
  Package.registerClass(EventClass);
  return EventClass;
});