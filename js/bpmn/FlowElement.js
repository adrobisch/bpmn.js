define(["bpmn/util/JSClass", "bpmn/BaseElement", "bpmn/Package"], function (jsclass, BaseElement, Package) {
  var flowElement = {
    tag : "flowElement",

    initialize : function () {
      this.callSuper();
    },

    init: function() {
      this.callSuper();
    },

    getDiagramElement : function () {
      return this._definitions.index.item(this.id() + ":di");
    },

    getBounds : function () {
      return this.getDiagramElement().bounds();
    },

    getLabel: function() {
      return this.getDiagramElement().label();
    },

    getWaypoints : function () {
      return this.getDiagramElement().waypoints();
    }
  };

  var FlowElementClass = new jsclass.Class(BaseElement, flowElement);
  Package.registerClass(FlowElementClass);
  return FlowElementClass;
});