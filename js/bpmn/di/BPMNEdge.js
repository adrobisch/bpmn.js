define(["bpmn/util/JSClass", "bpmn/di/DiagramElement", "bpmn/di/Waypoint", "bpmn/Package"], function (jsclass, DiagramElement, Waypoint, Package) {
  var BPMNEdge = {
    tag : "BPMNEdge",

    initialize : function () {
      this.callSuper();

      this.addReference({ name : "waypoints", containment: true, type : Waypoint});
    },

    init: function () {
      this.callSuper();
    }

  };

  var BPMNEdgeClass = new jsclass.Class(DiagramElement, BPMNEdge);
  Package.registerClass(BPMNEdgeClass);
  return BPMNEdgeClass;
});