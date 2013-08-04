define(["dojo/_base/declare", "bpmn/BaseElement", "bpmn/Package"], function (declare, BaseElement, Package) {
  var conditionExpression = {
    tag : "conditionExpression",

    constructor : function () {
    }
  };

  return Package.registerClass(declare("bpmn.ConditionExpression", BaseElement, conditionExpression));
});