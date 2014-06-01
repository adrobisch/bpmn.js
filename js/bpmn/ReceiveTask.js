define(["bpmn/util/JSClass", "bpmn/Task", "bpmn/Package"], function (jsclass, Task, Package) {
  var receiveTask = {
    tag : "receiveTask",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var ReceiveTaskClass = new jsclass.Class(Task, receiveTask);
  Package.registerClass(ReceiveTaskClass);
  return ReceiveTaskClass;
});