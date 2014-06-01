define(["bpmn/util/JSClass", "bpmn/Event", "bpmn/Package"], function (jsclass, Event, Package) {
  var throwEvent = {
    tag : "throwEvent",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };
  var ThrowEventClass = new jsclass.Class(Event, throwEvent);
  Package.registerClass(ThrowEventClass);
  return ThrowEventClass;
});