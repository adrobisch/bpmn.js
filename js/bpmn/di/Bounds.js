define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/Package"], function (jsclass, Clazz, Package) {
  var Bounds = {
    tag : "Bounds",

    initialize : function () {
      this.callSuper();

      this.addAttribute({ name : "x", type : "float"});
      this.addAttribute({ name : "y", type : "float"});
      this.addAttribute({ name : "width", type : "float"});
      this.addAttribute({ name : "height", type : "float"});
    },

    init: function() {
      this.callSuper();
    }
  };

  var BoundsClass = new jsclass.Class(Clazz, Bounds);
  Package.registerClass(BoundsClass);
  return BoundsClass;
});