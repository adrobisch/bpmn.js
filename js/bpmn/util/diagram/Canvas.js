define(["kinetic"], function (Kinetic) {
  var Canvas = function Canvas(options) {
    this.scale = options.scale;
    var stage = this.stage = new Kinetic.Stage({
      container: options.container,
      width: options.width ? options.width : 500,
      height: options.height ? options.height :  500
    });
    stage.setScale(this.scale, this.scale);

    this.shapeLayer = new Kinetic.Layer();
    this.connectionsLayer = new Kinetic.Layer();
    this.labelLayer = new Kinetic.Layer();

    stage.add(this.shapeLayer);
    stage.add(this.connectionsLayer);
    stage.add(this.labelLayer);

    this.createGroup = function (group) {
      return new Kinetic.Group(group);
    };

    this.createRect = function (rect) {
      return new Kinetic.Rect(rect);
    };

    this.createCircle = function (circle) {
      return new Kinetic.Circle(circle);
    };

    this.createLine = function (line) {
      return new Kinetic.Line(line);
    };

    this.createText = function (text) {
      return new Kinetic.Text(text);
    };

    this.createPolygon = function (polygon) {
      return new Kinetic.Polygon(polygon);
    };

    this.createPath = function (path) {
      return new Kinetic.Path(path);
    };

    this.createArrowLine = function (points, lineOptions, size){
      var headlen = size ? size : 6;

      var lastx = points[points.length-2];
      var lasty = points[points.length-1];

      var secondlastx = points[points.length-4];
      var secondlasty = points[points.length-3];

      var angle = Math.atan2(lasty-secondlasty,lastx-secondlastx);
      lineOptions.points = points.concat([lastx-headlen*Math.cos(angle-Math.PI/6),lasty-headlen*Math.sin(angle-Math.PI/6),lastx, lasty, lastx-headlen*Math.cos(angle+Math.PI/6),lasty-headlen*Math.sin(angle+Math.PI/6)]);

      var line = new Kinetic.Line(lineOptions);
      return line;
    };

    this.expandCanvasIfNeeded = function (shape) {
      // buffer for strokes etc
      var buffer = 10;
      var x = shape.getX(), y = shape.getY(), width = shape.getWidth(), height = shape.getHeight();

      if ((x + width) * this.scale > this.stage.getWidth()) {

        this.stage.setWidth((x+width+buffer)*this.scale);
      }

      if ((y + height) * this.scale > this.stage.getHeight()) {
        this.stage.setHeight((y+height+buffer)*this.scale);
      }
    };

  };

  return Canvas;
});