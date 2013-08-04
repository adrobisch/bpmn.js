/*! bpmn.js https://github.com/adrobisch/bpmn.js by Andreas Drobisch @adrobisch - LGPL v3 License http://www.gnu.org/licenses/lgpl.html */
define([
  "dojo/_base/declare",
  "bpmn/Definitions",
  "bpmn/execution/Instance",
  "bpmn/util/Serializer",
  "bpmn/editor/Renderer"
], function (declare, Definitions, Instance, Serializer, Renderer) {
  var bpmn = {

    constructor : function () {
    }

  };

  return declare("bpmn.Bpmn", null, bpmn);
});