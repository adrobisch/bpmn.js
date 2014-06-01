define(["bpmn/util/JSClass", "bpmn/BaseElement"], function (jsclass, BaseElement) {
  var callableElement = {
    initialize : function () {
      this.callSuper();
      this.addAttribute({ name : "name", type : String});
    },

    init: function() {
      this.callSuper();
    }
  };

  return new jsclass.Class(BaseElement, callableElement);
});