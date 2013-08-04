define(["dojo/_base/declare", "bpmn/di/DiagramElement", "bpmn/di/Bounds", "bpmn/Package"], function (declare, DiagramElement, Bounds, Package) {
  var BPMNShape = {
    tag : "BPMNShape",

    constructor : function () {
      this.addReference({ name : "bounds", type : Bounds});
    }

  };

  return Package.registerClass(declare("bpmn.BPMNShape", DiagramElement, BPMNShape));
});