define(["bpmn/util/JSClass", "bpmn/Clazz", "bpmn/Package", "bpmn/di/Bounds"], function (jsclass, Clazz, Package, Bounds) {
  var BPMNLabel = {
    tag : "BPMNLabel",

    initialize : function () {
      this.callSuper();
      this.addReference({ name : "bounds", type : Bounds});
    },

    init: function() {
      this.callSuper();
    }
  };

  var BPMNLabelClass = new jsclass.Class(Clazz, BPMNLabel);
  Package.registerClass(BPMNLabelClass);
  return BPMNLabelClass;
});