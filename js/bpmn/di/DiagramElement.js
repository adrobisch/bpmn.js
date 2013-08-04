define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/Package"], function (declare, Clazz, Package) {
  var DiagramElement = {
    tag : "diagramElement",

    constructor : function () {
      this.addAttribute({ name : "id", type : String});
      this.addAttribute({ name : "bpmnElement", type : String});
    },

    init : function () {
      this._definitions.index.add(this.bpmnElement() + ":di", this);
    }

  };

  return Package.registerClass(declare("bpmn.DiagramElement", Clazz, DiagramElement));
});