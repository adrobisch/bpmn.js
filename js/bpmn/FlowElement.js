define(["dojo/_base/declare", "bpmn/BaseElement", "bpmn/Package"], function (declare, BaseElement, Package) {
  var flowElement = {
    tag : "flowElement",

    constructor : function () {
    },

    getDiagramElement : function () {
      return this._definitions.index.item(this.id() + ":di");
    },

    getBounds : function () {
      return this.getDiagramElement().bounds();
    },

    getWaypoints : function () {
      return this.getDiagramElement().waypoints();
    }

  };

  return Package.registerClass(declare("bpmn.FlowElement", BaseElement, flowElement));
});