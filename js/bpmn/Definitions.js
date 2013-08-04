define([
  "dojo/_base/declare",
  "bpmn/BaseElement",
  "bpmn/Process",
  "bpmn/Collaboration",
  "bpmn/di/BPMNDiagram",
  "bpmn/util/Index",
  "bpmn/StartEvent",
  "bpmn/EndEvent",
  "bpmn/BoundaryEvent",
  "bpmn/UserTask",
  "bpmn/ServiceTask",
  "bpmn/SubProcess",
  "bpmn/ExclusiveGateway",
  "bpmn/ParallelGateway",
  "bpmn/SequenceFlow"
], function (declare, BaseElement, Process, Collaboration, BPMNDiagram, Index) {
  var definitions = {

    tag : "definitions",

    constructor : function () {
      this.addReference({name : "collaboration", type : Collaboration});
      this.addReference({name : "process",  containment : true, type : Process});
      this.addReference({name : "bpmnDiagram", type : BPMNDiagram});

      this.index = new Index();
    }

  };

  return declare("bpmn.Defintions", BaseElement, definitions);
});