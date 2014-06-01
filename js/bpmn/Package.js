define(["bpmn/util/JSClass"], function (jsclass) {
  var packageDef = {
    tagMap : {},

    initialize : function () {
    },

    registerClass : function (newClass) {
      var tag = newClass.prototype.tag;

      if (tag) {
        this.tagMap[tag.toLowerCase()] = newClass;
      }
      return newClass;
    }
  };

  var Package = new jsclass.Class(packageDef);
  return new Package();
});