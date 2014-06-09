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

    var shapeGroup = this.shapeGroup = new fabric.Group([], {left: 0, top: 0})
        .setOriginX(0).setOriginY(0);

    shapeGroup.setScaleX(this.scale);
    shapeGroup.setScaleY(this.scale);

    canvas.add(shapeGroup);

    var connectionGroup = this.connectionGroup = new fabric.Group([], {})
        .setOriginX(0).setOriginY(0);

    connectionGroup.setScaleX(this.scale);
    connectionGroup.setScaleY(this.scale);

    canvas.add(connectionGroup);

    this.draw = function() {
      this.canvas.renderAll();
    };

    this.addShape = function(shape) {
      shapeGroup.add(shape);
    };

    this.addConnection = function(connection) {
      connectionGroup.add(connection);
    };

    this.createGroup = function (groupOptions) {
      // FIXME create a group which acts like that: http://jsfiddle.net/fabricjs/2Y587/
      // problem is https://github.com/kangax/fabric.js/issues/485
      return new fabric.Group([], {top: 0, left: 0, width: 0, height: 0})
          .setOriginX(0).setOriginY(0);
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