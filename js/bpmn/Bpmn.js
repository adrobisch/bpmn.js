/*! bpmn.js https://github.com/adrobisch/bpmn.js by Andreas Drobisch @adrobisch - MIT License */
define([
  "dojo/_base/declare",
  "bpmn/Definitions",
  "bpmn/execution/Instance",
  "bpmn/util/Serializer",
  "bpmn/editor/Renderer"
], function (declare, Definitions, Instance, Serializer, Renderer) {
  var bpmn = {
    constructor : function () {
      this.renderer = Renderer;
      this.serializer = new Serializer;
    }
  };

  return declare("bpmn.Bpmn", null, bpmn);
});