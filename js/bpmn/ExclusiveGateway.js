define(["dojo/_base/declare", "bpmn/Gateway", "bpmn/Package"], function (declare, Gateway, Package) {
  var exclusiveGateway = {
    tag : "exclusiveGateway",

    constructor : function () {
      this.addAttribute({ name : "default", type : String});
    },

    getDefault : function () {
      return this._definitions.index.item(this.default());
    }
  };

  return Package.registerClass(declare("bpmn.ExclusiveGateway", Gateway, exclusiveGateway));
});