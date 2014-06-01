define(["bpmn/util/JSClass", "bpmn/Task", "bpmn/Package"], function (jsclass, Task, Package) {
  var serviceTask = {
    tag : "serviceTask",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var ServiceTaskClass = new jsclass.Class(Task, serviceTask);
  Package.registerClass(ServiceTaskClass);
  return ServiceTaskClass;
});