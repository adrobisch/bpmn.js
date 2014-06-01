define(["bpmn/util/JSClass", "bpmn/di/DiagramElement", "bpmn/di/Bounds", "bpmn/Package"], function (jsclass, DiagramElement, Bounds, Package) {
  var BPMNShape = {
    tag : "BPMNShape",

    initialize : function () {
      this.callSuper();

      this.addReference({ name : "bounds", type : Bounds});
    },

    init: function() {
      this.callSuper();
    }

  };

  var BPMNShapeClass = new jsclass.Class(DiagramElement, BPMNShape);
  Package.registerClass(BPMNShapeClass);
  return BPMNShapeClass;
});