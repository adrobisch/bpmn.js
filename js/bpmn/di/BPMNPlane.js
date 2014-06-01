define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/Package", "bpmn/di/BPMNShape", "bpmn/di/BPMNEdge", "bpmn/di/DiagramElement"], function (jsclass, Clazz, Package, Shape, Edge, DiagramElement) {
  var BPMNPlane = {
    tag : "BPMNPlane",

    initialize : function () {
      this.callSuper();

      this.addReference({ name : "diagramElements", containment : true, type : DiagramElement});
    },

    init: function () {
      this.callSuper();
    }
  };

  var BPMNPlaneClass = new jsclass.Class(Clazz, BPMNPlane);
  Package.registerClass(BPMNPlaneClass);
  return BPMNPlaneClass;
});