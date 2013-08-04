define(["dojo/_base/declare", "bpmn/Package"], function (declare, Package) {
  var collaboration = {
    tag : "collaboration",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.Collaboration", null, collaboration));
});