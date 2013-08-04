define(["dojo/_base/declare", "bpmn/Task", "bpmn/Package"], function (declare, Task, Package) {
  var serviceTask = {
    tag : "serviceTask",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.ServiceTask", Task, serviceTask));
});