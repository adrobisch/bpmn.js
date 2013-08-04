define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/Package", "bpmn/di/BPMNShape", "bpmn/di/BPMNEdge"], function (declare, Clazz, Package) {
  var BPMNPlane = {
    tag : "BPMNPlane",

    constructor : function () {
      this.addReference({ name : "diagramElements", containment : true, type : bpmn.DiagramElement});
    }
  };

  return Package.registerClass(declare("bpmn.BPMNPlane", Clazz, BPMNPlane));
});