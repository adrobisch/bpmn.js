define(["bpmn/util/JSClass", "bpmn/Package"], function (jsclass, Package) {
  var collaboration = {
    tag : "collaboration",

    initialize : function () {
    }
  };
  var CollaborationClass = new jsclass.Class(collaboration);
  Package.registerClass(CollaborationClass);
  return CollaborationClass;
});