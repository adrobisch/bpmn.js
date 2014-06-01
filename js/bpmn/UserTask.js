define(["bpmn/util/JSClass", "bpmn/Task", "bpmn/Package"], function (jsclass, Task, Package) {
  var userTask = {
    tag : "userTask",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var UserTaskClass = new jsclass.Class(Task, userTask);
  Package.registerClass(UserTaskClass);
  return UserTaskClass;
});