define(["bpmn/util/JSClass"], function (jsclass) {
  var index = {
    initialize : function () {
      this._ = {};
    },

    add : function (key, value) {
      this._[key] = value;
    },

    addArray : function (key, value) {
      if (!this._[key]) {
        this._[key] = [];
      }

      this._[key].push(value);
    },

    addMap : function (key, property, value) {
      if (!this._[key]) {
        this._[key] = {};
      }

      this._[key][property] = value;
    },

    item : function (key) {
      return this._[key];
    }
  };

  return new jsclass.Class(index);
});
