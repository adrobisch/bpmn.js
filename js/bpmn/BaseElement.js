define(["bpmn/util/JSClass", "bpmn/Clazz"], function (jsclass, Clazz) {
  var baseElement = {
    tag: "baseElement",

    initialize : function () {
      this.callSuper();

      this.addReference({ name : "documentation", type : function Documentation () {}});
      this.addAttribute({ name : "id", type : String});
      this.addAttribute({ name : "name", type : String});

      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });

      this.id(uuid);
    },

    init : function() {
      var id = this.id();

      this._definitions.index.add(id, this);
      this._definitions.index.addMap(this.declaredClass, id, this);
    }
  };

  return new jsclass.Class(Clazz, baseElement);
});