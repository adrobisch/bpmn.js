define(["bpmn/util/JSClass", "bpmn/BaseElement", "bpmn/Package"], function (jsclass, BaseElement, Package) {
  var conditionExpression = {
    tag : "conditionExpression",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    }
  };
  var ConditionExpressionClass = new jsclass.Class(BaseElement, conditionExpression);
  Package.registerClass(ConditionExpressionClass);
  return ConditionExpressionClass;
});