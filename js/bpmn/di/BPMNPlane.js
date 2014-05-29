define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/Package", "bpmn/di/BPMNShape", "bpmn/di/BPMNEdge", "bpmn/di/DiagramElement"], function (declare, Clazz, Package, Shape, Edge, DiagramElement) {
  var BPMNPlane = {
    tag : "BPMNPlane",

    constructor : function () {
      this.addReference({ name : "diagramElements", containment : true, type : DiagramElement});
    }
  };

  return Package.registerClass(declare("bpmn.BPMNPlane", Clazz, BPMNPlane));
});