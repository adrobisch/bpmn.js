define(["dojo/_base/declare", "bpmn/ThrowEvent", "bpmn/Package"], function (declare, ThrowEvent, Package) {
  var endEvent = {
    tag : "endEvent",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.EndEvent", ThrowEvent, endEvent));
});