define(["bpmn/util/JSClass", "bpmn/Package", "bpmn/Definitions", "bpmn/BaseElement", "sax"], function (jsclass, Package, Definitions, BaseElement) {
  var serializer = {
    initialize : function () {
    },

    fromXML : function (xmlString) {
      if (!xmlString) {
        return;
      }

      var setAttributeFromNode = function (attrName, node, bpmnObj, type) {
        if (node.attributes[attrName]) {
          var value = node.attributes[attrName].value;
          if (type == "float") {
            value = parseFloat(value);
          }
          if (type == "boolean") {
            value = (value.toLowerCase() == "true");
          }
          if (type == "integer") {
            value = parseInt(value);
          }
          bpmnObj[attrName](value);
        }
      };

      // create a strict parser with namespace support
      var parser = sax.parser(true, {
        xmlns : true,
        lowercase : true,
        trim : true
      });

      parser.stack = [];

      Array.prototype.peek = function() {
        return (this.length == 0) ? null : this[this.length -1];
      };

      var openTagHandlers = {
        "definitions" : function (node) {
          parser.definitions = new Definitions();
          parser.stack.push(parser.definitions);
        },

        "default": function (node) {
          var parent = parser.stack.peek();
          var tagLookup = node.local.toLowerCase();
          var PackageClass = Package.tagMap[tagLookup];

          var newRef = PackageClass ? new PackageClass(): new BaseElement();
          parser.stack.push(newRef);

          newRef._definitions = parser.definitions;

          for (var attributeName in newRef.attribute) {
            setAttributeFromNode(attributeName, node, newRef, newRef.attribute[attributeName].type);
          }

          var refFound = null;
          for (var index in parent.reference) {
            var ref = parent.reference[index];

            if(newRef.isA(ref.type)) {
              refFound = ref;
              break;
            }
          }

          newRef.init();

          if (refFound && refFound.containment === true) {
            parent[refFound.name]().push(newRef);
          }else if (refFound) {
            parent[refFound.name](newRef);
          }
        }
      };

      parser.onerror = function (e) {
        // an error happened.
        console.log("error", e);
      };

      parser.onopentag = function (node) {
        if (openTagHandlers[node.local]) {
          openTagHandlers[node.local](node);
        }else {
          openTagHandlers["default"](node);
        }
      };

      parser.onclosetag = function (node) {
        parser.stack.pop();
      };

      parser.ontext = function (t) {
        // got some text.  t is the string of text.
        parser.stack.peek().setText(t);
      };

      parser.onend = function () {
        // parser stream is done, and ready to have more stuff written to it.
      };

      parser.write(xmlString).close();

      return parser.definitions;
    }
  }

  return new jsclass.Class(serializer);
});