define(["dojo/_base/declare", "bpmn/CatchEvent", "bpmn/Package"], function (declare, CatchEvent, Package) {
  var startEvent = {
    tag : "startEvent",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.StartEvent", CatchEvent, startEvent));
});