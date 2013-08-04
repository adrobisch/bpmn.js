define(["dojo/_base/declare", "bpmn/CatchEvent", "bpmn/Package"], function (declare, CatchEvent, Package) {
  var boundaryEvent = {
    tag : "boundaryEvent",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.BoundaryEvent", CatchEvent, boundaryEvent));
});