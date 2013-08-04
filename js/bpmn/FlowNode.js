define(["dojo/_base/declare", "bpmn/FlowElement", "bpmn/Package"], function (declare, FlowElement, Package) {
  var flowNode = {
    tag : "flowNode",

    constructor : function () {
    },

    incoming : function () {
      var incoming = this._definitions.index.item("target:"+this.id());
      return incoming ? incoming : [];
    },

    outgoing : function () {
      var outgoing = this._definitions.index.item("source:"+this.id());
      return outgoing ? outgoing : [];
    }
  };

  return Package.registerClass(declare("bpmn.FlowNode", FlowElement, flowNode));
});