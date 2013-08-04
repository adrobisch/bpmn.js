define(["dojo/_base/declare", "bpmn/BaseElement"], function (declare, BaseElement) {
  var callableElement = {
    constructor : function () {
      this.addAttribute({ name : "name", type : String});
    }
  }

  return declare("bpmn.CallableElement", BaseElement, callableElement);
});