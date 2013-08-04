define(["dojo/_base/declare", "bpmn/FlowElement", "bpmn/ConditionExpression", "bpmn/Package"], function (declare, FlowElement, ConditionExpression, Package) {
  var sequenceFlow = {
    tag : "sequenceFlow",

    constructor : function () {
      this.addAttribute({ name : "sourceRef", type : String});
      this.addAttribute({ name : "targetRef", type : String});
      this.addReference({name : "conditionExpression", type : ConditionExpression});
    },

    getSourceRef : function () {
      return this._definitions.index.item(this._sourceRef);
    },

    getTargetRef : function () {
      return this._definitions.index.item(this._targetRef);
    },

    init : function () {
      this.inherited(arguments);

      this._definitions.index.addArray("target:"+this.targetRef(), this);
      this._definitions.index.addArray("source:"+this.sourceRef(), this);
    }

  };

  return Package.registerClass(declare("bpmn.SequenceFlow", FlowElement, sequenceFlow));
});