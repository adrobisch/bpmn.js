define(["fabric", "lodash"], function (fabric, _) {

  if (__isNode) {
    fabric = fabric.fabric;
  }

  var Canvas = function Canvas(options) {
    this.scale = options.scale;

    var canvas = null;

    if (__isNode) {
      canvas = this.canvas = fabric.createCanvasForNode(1000, 1000);
    } else {
      canvas = this.canvas = new fabric.Canvas(options.container);
    }

    this.draw = function() {
      this.canvas.renderAll();
    };

    this.addShape = function(shape) {
      canvas.add(shape);
    };

    this.addConnection = function(connection) {
      canvas.add(connection);
    };

    this.createGroup = function (groupOptions) {
      // FIXME create a group which acts like that: http://jsfiddle.net/fabricjs/2Y587/
      // problem is https://github.com/kangax/fabric.js/issues/485
      return new function () {
        this.groupShapes = [];
        this.groupProperties = {};

        canvas.on("object:selected", function (options) {
          if (options.target.type == "group") {
            canvas.selectedGroup = options.target;

            options.target.set({"hasRotatingPoint" : false});
            _.forEach(options.target._objects, function (shape) {
              if (shape.shapeGroup) {
                shape.shapeGroup.setAll({"visible" : false});
              }
            });
          }
        });

        canvas.on("selection:cleared", function (options) {
          console.log("cleared", options);

          if (canvas.selectedGroup) {
            _.forEach(canvas.selectedGroup._objects, function (shape) {
              if (shape.shapeGroup) {
                shape.shapeGroup.setAll({"visible" : true});
              }
            });
            canvas.selectedGroup = undefined;
          }
        });

        canvas.on("object:moving", function (options) {
          var groupFunction = function shapeFn(group) {
            if (!group.groupProperties) {
              return;
            }

            group.groupProperties.left = options.target.left;
            group.groupProperties.top = options.target.top;
            group.setCoords();
          };

          if (options.target.shapeGroup) {
            groupFunction(options.target.shapeGroup);
          }
        });

        this.add = function(shape) {
          canvas.add(shape);
          shape.shapeGroup = this;

          shape.offsetLeft = shape.left;
          shape.offsetTop = shape.top;

          this.groupShapes.push(shape);

          return this;
        };

        this.set = function(properties) {
          this.groupProperties = properties;
          return this;
        };

        this.setAll = function(properties) {
          _.forEach(this.groupShapes, function (groupShape){
              groupShape.set(properties);
          });
        };

        this.setCoords = function () {
          var shapeProps = this.groupProperties;
          _.forEach(this.groupShapes, function (shape) {
            console.log("setting coords: ", shape.type);
            shape.left = shape.offsetLeft + shapeProps.left;
            shape.top = shape.offsetTop + shapeProps.top;
            shape.setCoords();
          });
          return this;
        };
      };
    };

    this.createRect = function (rect) {
      return new fabric.Rect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        fill: rect.fill,
        stroke: rect.stroke,
        strokeWidth: rect.strokeWidth,
        padding: 0,
        rx: rect.cornerRadius,
        ry: rect.cornerRadius
      });
    };

    this.createCircle = function (circle) {
      return new fabric.Circle({
        radius: circle.width / 2 - circle.strokeWidth,
        left: 0,
        top: 0,
        fill: circle.fill,
        stroke: circle.stroke,
        strokeWidth: circle.strokeWidth
      });
    };

    this.createText = function (text) {
      var textProperties = {
        top: text.top,
        left: text.left,
        width: text.width,
        height: text.height,
        fontSize: text.fontSize,
        fontFamily: text.fontFamily
      };

      var textObj = new fabric.Text(text.text, textProperties);
      return textObj;
    };

    this.createPolygon = function (polygon) {
      var polygonProperties = {
        top: 0,
        left: 0,
        fill: polygon.fill,
        stroke: polygon.stroke,
        strokeWidth: polygon.strokeWidth
      };
      return new fabric.Polygon(polygon.points, polygonProperties);
    };

    this.createPath = function (pathProperties) {
      var path = new fabric.Path(pathProperties.data);
      path.set({ left: 0, top: 0 });
      return path;
    };

    this.createArrowLine = function (points, lineOptions, size){
      var arrowSize = size ? size : 8;

      var last = points[points.length-1];
      var secondLast = points[points.length-2];

      var angle = Math.atan2(last.y - secondLast.y, last.x - secondLast.x);

      var firstArrowPoint = {x: last.x - arrowSize * Math.cos(angle-Math.PI/6), y: last.y - arrowSize * Math.sin(angle-Math.PI/6)};

      var arrowPoints = [
          firstArrowPoint,
          {x: last.x, y: last.y},
          {x: last.x-arrowSize * Math.cos(angle+Math.PI/6), y: last.y - arrowSize * Math.sin(angle+Math.PI/6)}];

      var linePoints = points.concat(arrowPoints);
      var lineGroup = new fabric.Group([], {});

      var previous = null;

      _.forEach(linePoints, function (point, index) {
        if (index == 0) {
          previous = point;
          return;
        }

        var line = new fabric.Line([previous.x, previous.y, point.x, point.y], {
          stroke: lineOptions.stroke,
          fill: 'white',
          strokeWidth: lineOptions.strokeWidth
        });

        lineGroup.add(line);
        previous = point;
      });

      return lineGroup;
    };

    this.expandCanvasIfNeeded = function (shape) {
      // buffer for strokes etc
      var buffer = 10;
      var x = shape.getLeft(), y = shape.getTop(), width = shape.getWidth(), height = shape.getHeight();

      if ((x + width) * this.scale > this.canvas.getWidth()) {

        this.canvas.setWidth((x+width+buffer)*this.scale);
      }

      if ((y + height) * this.scale > this.canvas.getHeight()) {
        this.canvas.setHeight((y+height+buffer)*this.scale);
      }
      this.canvas.calcOffset();
    };

  };

  return Canvas;
});
