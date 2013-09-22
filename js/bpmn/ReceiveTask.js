define(["dojo/_base/declare", "bpmn/Task", "bpmn/Package"], function (declare, Task, Package) {
  var receiveTask = {
    tag : "receiveTask",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.ReceiveTask", Task, receiveTask));
});