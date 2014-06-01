define(["bpmn/util/JSClass", "bpmn/CatchEvent", "bpmn/Package"], function (jsclass, CatchEvent, Package) {
  var startEvent = {
    tag : "startEvent",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };

  var StartEventClass = new jsclass.Class(CatchEvent, startEvent);
  Package.registerClass(StartEventClass);
  return StartEventClass;
});