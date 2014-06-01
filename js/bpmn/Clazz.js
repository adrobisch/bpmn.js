define(["bpmn/util/JSClass"], function (jsclass) {

  var clazz = {
    initialize : function () {

      this.text = null;

      /*
       a reference is a object: {name : string, containment : boolean, class : constructor}
      */
      this.reference = {};

      /*
       a attribute is a object: {name : string, class : constructor}
       */
      this.attribute = {};

    },

    addReference: function (ref) {
      this.reference[ref.name] = ref;
      var name = this.__internalFieldName(ref.name)

      if (ref.containment === true) {
        this[name] = [];
      } else {
        this[name] = null;
      }
      this[ref.name] = function (newValue) {
        return this.accessor(ref.name, newValue)
      };
    },

    addAttribute: function (attr) {
      this.attribute[attr.name] = attr;
      this[attr.name] = function (newValue) {
        return this.accessor(attr.name, newValue)
      };
    },

    accessor : function (field, newValue) {
      var name = this.__internalFieldName(field);
      if (newValue != null && newValue != undefined) {
        this[name] = newValue;
      }
      return this[name];
    },

    __internalFieldName : function (field) {
      return "_" + field;
    },

    init : function () {
    },

    setText : function (text) {
      this.text = text;
    }
  };

  return new jsclass.Class(clazz);
});