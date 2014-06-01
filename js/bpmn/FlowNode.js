define(["bpmn/util/JSClass", "bpmn/FlowElement", "bpmn/Package"], function (jsclass, FlowElement, Package) {
  var flowNode = {
    tag : "flowNode",

    initialize : function () {
      this.callSuper();
    },

    init: function () {
      this.callSuper();
    },

    incoming : function () {
      var incoming = this._definitions.index.item("target:" + this.id());
      return incoming ? incoming : [];
    },

    outgoing : function () {
      var outgoing = this._definitions.index.item("source:" + this.id());
      return outgoing ? outgoing : [];
    }
  };

  var FlowNodeClass = new jsclass.Class(FlowElement, flowNode);
  Package.registerClass(FlowNodeClass);
  return FlowNodeClass;
});