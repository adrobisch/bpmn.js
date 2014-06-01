define(["bpmn/util/JSClass", "bpmn/FlowElement", "bpmn/ConditionExpression", "bpmn/Package"], function (jsclass, FlowElement, ConditionExpression, Package) {
  var sequenceFlow = {
    tag : "sequenceFlow",

    initialize : function () {
      this.callSuper();

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
      this.callSuper();

      if (!this._definitions.index.addArray) {
        console.log("cant addArray" + this.id());
        console.log(this._definitions.index.tag);
      }

      this._definitions.index.addArray("target:"+this.targetRef(), this);
      this._definitions.index.addArray("source:"+this.sourceRef(), this);
    }

  };

  var SequenceFlowClass = new jsclass.Class(FlowElement, sequenceFlow);
  Package.registerClass(SequenceFlowClass);
  return SequenceFlowClass;
});