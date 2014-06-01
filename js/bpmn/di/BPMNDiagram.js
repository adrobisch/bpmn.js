define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/di/BPMNPlane", "bpmn/Package"], function (jsclass, Clazz, BPMNPlane, Package) {
  var BPMNDiagram = {
    tag : "BPMNDiagram",

    initialize : function () {
      this.callSuper();
      this.addReference({ name : "plane", type : BPMNPlane});
    }
  };
  var BPMNDiagramClass = new jsclass.Class(Clazz, BPMNDiagram);
  Package.registerClass(BPMNDiagramClass);
  return BPMNDiagramClass;
});