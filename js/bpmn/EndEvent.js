define(["bpmn/util/JSClass", "bpmn/ThrowEvent", "bpmn/Package"], function (jsclass, ThrowEvent, Package) {
  var endEvent = {
    tag : "endEvent",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };

  var EndEventClass = new jsclass.Class(ThrowEvent, endEvent);
  Package.registerClass(EndEventClass);
  return EndEventClass;
});