define(["bpmn/util/JSClass", "bpmn/CallableElement", "bpmn/FlowElementsContainer", "bpmn/Package"], function (jsclass, CallableElement, FlowElementsContainer, Package) {
  var process = {
    include: [FlowElementsContainer],

    tag : "process",

    initialize : function () {
      this.callSuper();

      this.addAttribute({ name : "isExecutable", type : "boolean"});
      this.addAttribute({ name : "name", type : String});
    }
  };

  var processClass = new jsclass.Class(CallableElement, process);

  return Package.registerClass(processClass);
});