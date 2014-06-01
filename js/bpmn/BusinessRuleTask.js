define(["bpmn/util/JSClass", "bpmn/Task", "bpmn/Package"], function (jsclass, Task, Package) {
  var businessRuleTask = {
    tag : "businessRuleTask",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var BusinessRuleTaskClass = new jsclass.Class(Task, businessRuleTask);
  Package.registerClass(BusinessRuleTaskClass);
  return BusinessRuleTaskClass;
});