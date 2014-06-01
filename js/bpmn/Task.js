define(["bpmn/util/JSClass", "bpmn/Activity", "bpmn/Package"], function (jsclass, Activity, Package) {
  var task = {
    tag : "task",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    }
  };

  var TaskClass = new jsclass.Class(Activity, task);
  Package.registerClass(TaskClass);
  return TaskClass;
});