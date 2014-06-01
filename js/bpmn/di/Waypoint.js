define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/Package"], function (jsclass, Clazz, Package) {
  var Waypoint = {
    tag : "waypoint",

    initialize : function () {
      this.callSuper();

      this.addAttribute({ name : "x", type : "float"});
      this.addAttribute({ name : "y", type : "float"});
    },

    init: function () {
      this.callSuper();
    },

    __internalFieldName : function (field) {
      return field;
    }
  };

  var WaypointClass = new jsclass.Class(Clazz, Waypoint);
  Package.registerClass(WaypointClass);
  return WaypointClass;
});