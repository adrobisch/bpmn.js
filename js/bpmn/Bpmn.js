/*! bpmn.js https://github.com/adrobisch/bpmn.js by Andreas Drobisch @adrobisch - MIT License */
define([
  "bpmn/util/JSClass",
  "bpmn/Definitions",
  "bpmn/execution/Instance",
  "bpmn/util/Serializer",
  "bpmn/editor/Renderer"
], function (jsclass, Definitions, Instance, Serializer, Renderer) {
  var bpmn = {
    initialize: function () {
      this.serializer = new Serializer;
    },

    fromXML: function(bpmnXml) {
      return this.serializer.fromXML(bpmnXml);
    },

    renderer: function (definitions, options) {
      return new Renderer(definitions, options);
    },

    instance: function(definitions, configuration) {
      return new Instance(definitions, configuration);
    }
  };

  var bpmnClass = new jsclass.Class(bpmn);
  window.Bpmn = bpmnClass;
  return bpmnClass;
});