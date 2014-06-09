define(["bpmn/util/JSClass", "bpmn/di/DiagramElement", "bpmn/di/Bounds", "bpmn/di/BPMNLabel", "bpmn/Package"], function (jsclass, DiagramElement, Bounds, BPMNLabel, Package) {
  var BPMNShape = {
    tag : "BPMNShape",

    initialize : function () {
      this.callSuper();

      this.addReference({ name : "bounds", type : Bounds});
      this.addReference({ name : "label", type : BPMNLabel});
    },

    init: function() {
      this.callSuper();
    }

  };

  var BPMNShapeClass = new jsclass.Class(DiagramElement, BPMNShape);
  Package.registerClass(BPMNShapeClass);
  return BPMNShapeClass;
});