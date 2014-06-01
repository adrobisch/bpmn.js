define(["bpmn/util/JSClass", "bpmn/CatchEvent", "bpmn/Package"], function (jsclass, CatchEvent, Package) {
  var boundaryEvent = {
    tag : "boundaryEvent",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };

  var BoundaryEventClass = new jsclass.Class(CatchEvent, boundaryEvent);
  Package.registerClass(BoundaryEventClass);
  return BoundaryEventClass;
});