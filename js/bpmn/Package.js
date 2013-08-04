define(["dojo/_base/declare"], function (declare) {
  var p = {
    tagMap : {},

    constructor : function () {
    },

    registerClass : function (newClass) {
      var tag = newClass.prototype.tag;
      if (tag) {
        this.tagMap[tag.toLowerCase()] = newClass;
      }
      return newClass;
    }
  };

  var Package =  declare("bpmn.Package", null, p);
  return window.bpmnPackage = new Package();
});