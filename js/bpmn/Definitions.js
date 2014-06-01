define([
  "bpmn/util/JSClass",
  "bpmn/util/Index",
  "bpmn/BaseElement",
  "bpmn/Process",
  "bpmn/Collaboration",
  "bpmn/di/BPMNDiagram",
  "bpmn/StartEvent",
  "bpmn/EndEvent",
  "bpmn/BoundaryEvent",
  "bpmn/UserTask",
  "bpmn/ServiceTask",
  "bpmn/BusinessRuleTask",
  "bpmn/ReceiveTask",
  "bpmn/SubProcess",
  "bpmn/ExclusiveGateway",
  "bpmn/ParallelGateway",
  "bpmn/SequenceFlow"
], function (jsclass, Index, BaseElement, Process, Collaboration, BPMNDiagram) {
  var definitions = {

    tag : "definitions",

    initialize : function () {
      this.callSuper();

      this.addReference({name : "collaboration", type : Collaboration});
      this.addReference({name : "process",  containment : true, type : Process});
      this.addReference({name : "bpmnDiagram", type : BPMNDiagram});

      this.index = new Index();
    }
  };

  return new jsclass.Class(BaseElement, definitions);
});