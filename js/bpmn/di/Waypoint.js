define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/Package"], function (declare, Clazz, Package) {
  var Waypoint = {
    tag : "waypoint",

    constructor : function () {
      this.addAttribute({ name : "x", type : "float"});
      this.addAttribute({ name : "y", type : "float"});
    },

    __internalFieldName : function (field) {
      return field;
    }
  };

  return Package.registerClass(declare("bpmn.Waypoint", Clazz, Waypoint));
});