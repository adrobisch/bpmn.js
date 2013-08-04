define(["dojo/_base/declare", "bpmn/Activity", "bpmn/Package"], function (declare, Activity, Package) {
  var task = {
    tag : "task",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.Task", Activity, task));
});