define(["dojo/_base/declare", "bpmn/di/DiagramElement", "bpmn/di/Waypoint", "bpmn/Package"], function (declare, DiagramElement, Waypoint, Package) {
  var BPMNEdge = {
    tag : "BPMNEdge",

    constructor : function () {
      this.addReference({ name : "waypoints", containment: true, type : Waypoint});
    }

  };

  return Package.registerClass(declare("bpmn.BPMNEdge", DiagramElement, BPMNEdge));
});