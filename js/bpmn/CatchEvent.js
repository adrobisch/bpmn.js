define(["dojo/_base/declare", "bpmn/Event", "bpmn/Package"], function (declare, Event, Package) {
  var catchEvent = {
    tag : "catchEvent",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.CatchEvent", Event, catchEvent));
});