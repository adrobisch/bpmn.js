define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/di/BPMNPlane", "bpmn/Package"], function (declare, Clazz, BPMNPlane, Package) {
  var BPMNDiagram = {
    tag : "BPMNDiagram",

    constructor : function () {
      this.addReference({ name : "plane", type : BPMNPlane});
    }
  };

  return Package.registerClass(declare("bpmn.BPMNDiagram", Clazz, BPMNDiagram));
});