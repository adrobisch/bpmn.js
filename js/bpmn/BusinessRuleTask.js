define(["dojo/_base/declare", "bpmn/Task", "bpmn/Package"], function (declare, Task, Package) {
  var businessRuleTask = {
    tag : "businessRuleTask",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.BusinessRuleTask", Task, businessRuleTask));
});