define(["dojo/_base/declare", "bpmn/Task", "bpmn/Package"], function (declare, Task, Package) {
  var userTask = {
    tag : "userTask",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.UserTask", Task, userTask));
});