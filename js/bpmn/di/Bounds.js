define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/Package"], function (declare, Clazz, Package) {
  var Bounds = {
    tag : "Bounds",

    constructor : function () {
      this.addAttribute({ name : "x", type : "float"});
      this.addAttribute({ name : "y", type : "float"});
      this.addAttribute({ name : "width", type : "float"});
      this.addAttribute({ name : "height", type : "float"});
    }
  };

  return Package.registerClass(declare("bpmn.Bounds", Clazz, Bounds));
});