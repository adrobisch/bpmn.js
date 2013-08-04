define(["dojo/_base/declare", "bpmn/Clazz", "bpmn/util/Index"], function (declare, Clazz) {
  var baseElement = {
    constructor : function () {
      this.addReference({ name : "documentation", type : function Documentation () {}});
      this.addAttribute({ name : "id", type : String});
      this.addAttribute({ name : "name", type : String});

      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });

      this.id(uuid);
    },

    init : function () {
      this._definitions.index.add(this.id(), this);
      this._definitions.index.addMap(this.declaredClass, this.id(), this);
    }
  }

  return declare("bpmn.BaseElement", Clazz, baseElement);
});