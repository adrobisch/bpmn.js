define(["dojo/_base/declare", "bpmn/Event", "bpmn/Package"], function (declare, Event, Package) {
  var throwEvent = {
    tag : "throwEvent",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.ThrowEvent", Event, throwEvent));
});