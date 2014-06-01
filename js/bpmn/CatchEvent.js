define(["bpmn/util/JSClass", "bpmn/Event", "bpmn/Package"], function (jsclass, Event, Package) {
  var catchEvent = {
    tag : "catchEvent",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };
  var CatchEventClass = new jsclass.Class(Event, catchEvent);
  Package.registerClass(CatchEventClass);
  return CatchEventClass;
});