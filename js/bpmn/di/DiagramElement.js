define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/Package"], function (jsclass, Clazz, Package) {
  var DiagramElement = {
    tag : "diagramElement",

    initialize : function () {
      this.callSuper();

      this.addAttribute({ name : "id", type : String});
      this.addAttribute({ name : "bpmnElement", type : String});
    },

    init : function () {
      this._definitions.index.add(this.bpmnElement() + ":di", this);
    }

  };
  var DiagramElementClass = new jsclass.Class(Clazz, DiagramElement);
  Package.registerClass(DiagramElementClass);
  return DiagramElementClass;
});