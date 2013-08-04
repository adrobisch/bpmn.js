define(["kinetic",
        "dojo/_base/declare",
        "dojo/_base/array",
        "bpmn/Activity",
        "bpmn/Gateway",
        "bpmn/Event",
        "bpmn/SequenceFlow"],
function (Kinetic, declare, array, Activity, Gateway, Event, SequenceFlow) {

  var Renderer = {

    skins: {
      "default": {
        "event_stroke" : 'black',
        "activity_stroke" : 'black',
        "activity_fill" : 'white',
        "activity_corner_radius" : 10,
        "label_font_family" : "Arial",
        "label_font_size" : 12,
        "label_fill" :  "black"
      }
    },

    constructor : function (definitions) {
      this.definitions = definitions;
      this.scale = 1.0;
      this.skinName = "default";
    },

    evaluateOptions : function (options) {
      if (options.skin) {
        this.skinName = options.skin;
      }
      if (options.scale) {
        this.scale = options.scale;
      }
    },

    render :  function (options) {
      this.evaluateOptions(options);

      var stage = this.stage = new Kinetic.Stage({
        container: options.container,
        width: options.width ? options.width : 500,
        height: options.height ? options.height :  500
      });
      stage.setScale(this.scale, this.scale);

      var shapeLayer = this.shapeLayer = new Kinetic.Layer();
      var connectionsLayer = this.connectionsLayer = new Kinetic.Layer();
      var labelLayer = this.labelLayer = new Kinetic.Layer();

      stage.add(shapeLayer);
      stage.add(connectionsLayer);
      stage.add(labelLayer);

      this.renderElements();

      shapeLayer.draw();
      connectionsLayer.draw();
      labelLayer.draw();
    },

    renderElements : function () {
      if (this.definitions.process().length > 1) {
        throw new Error("Only single process models are supported");
      }

      array.forEach(this.definitions.process(), function (process) {
        array.forEach(process.flowElements(), function (flowElement){
          this.renderElement(flowElement);
        }, this);
      }, this);

    },

    renderElement: function (element) {
      var group = new Kinetic.Group({
        draggable: true
      });

      if (element instanceof SequenceFlow) {
        this.renderConnection(element, group);
        this.connectionsLayer.add(group);
      }
      else if (element instanceof Activity) {
        this.addCenteredInnerLabel(element, this.renderActivity(element, group), element.name());
        this.shapeLayer.add(group);
        this.setGroupBounds(group, element.getBounds());
      }
      else if (element instanceof Event) {
        this.renderEvent(element, group);
        this.shapeLayer.add(group);
        this.setGroupBounds(group, this.eventBounds(element));
      }
      else if (element instanceof Gateway) {
        this.renderGateway(element, group);
        this.shapeLayer.add(group);
        this.setGroupBounds(group, element.getBounds());
      }
      else {
        console.log("unable to render flowElement", element);
      }

      this.expandStageIfNeeded(group);
    },

    eventBounds: function (eventElement) {
      var bounds = eventElement.getBounds();
      return {
        x: function () {return bounds.x() + bounds.width() / 2 },
        y: function () {return bounds.y() + bounds.height() / 2},
        width: function () {return bounds.width()},
        height: function () {return bounds.height()}
      };
    },

    setGroupBounds : function (group, bounds) {
      group.setX(bounds.x());
      group.setY(bounds.y());
      group.setWidth(bounds.width());
      group.setHeight(bounds.height());
    },

    renderActivity: function (activity, group) {
      var bounds = activity.getBounds();
      var cornerRadius = this.skin()["activity_corner_radius"];

      var rect =  new Kinetic.Rect({
        width: bounds.width(),
        height: bounds.height(),
        "cornerRadius" : cornerRadius,
        stroke: this.skin()["activity_stroke"],
        fill: this.skin()["activity_fill"],
        strokeWidth: 2
      });

      group.add(rect);

      return group;
    },

    renderEvent: function (event, group) {
      var bounds = event.getBounds();
      var circle =  new Kinetic.Circle({
        width: bounds.width(),
        height: bounds.height(),
        stroke: this.skin()["event_stroke"],
        strokeWidth: 2,
        draggable: true
      });

      group.add(circle);

      return group;
    },

    renderGateway: function (gateway, group) {
      var bounds = gateway.getBounds();
      var rect =  new Kinetic.Polygon({
        points: [0,  bounds.height() /2, // left
                 bounds.width() /2, 0, // top
                 bounds.width(), bounds.height() /2, // right
                 bounds.width() /2, bounds.height()], // bottom
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
      });

      group.add(rect);
      return group;
    },

    addCenteredInnerLabel : function (containerElement, group, text) {
      var bounds = containerElement.getBounds();

      var label = new Kinetic.Text({
        text: text,
        fontSize: this.skin()["label_font_size"],
        fontFamily: this.skin()["label_font_family"],
        fill: this.skin()["label_fill"],
        align: 'center'
      });

      label.setY(bounds.height()/2 - label.getFontSize());
      label.setWidth(bounds.width());

      group.add(label);
      return group;
    },

    renderConnection: function (connection, group) {
      var joinedPoints = [];

      array.forEach(connection.getWaypoints(), function (point){
        joinedPoints.push(point.x);
        joinedPoints.push(point.y);
      });

      var line = new Kinetic.Line({
        points: joinedPoints,
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      });

      group.add(line);
      return group;
    },

    expandStageIfNeeded : function (shape) {
      // buffer for strokes etc
      var buffer = 10;
      var x = shape.getX(), y = shape.getY(), width = shape.getWidth(), height = shape.getHeight();

      if ((x + width) * this.scale > this.stage.getWidth()) {

        this.stage.setWidth((x+width+buffer)*this.scale);
      }

      if ((y + height) * this.scale > this.stage.getHeight()) {
        this.stage.setHeight((y+height+buffer)*this.scale);
      }
    },

    skin: function() {
      return this.skins[this.skinName];
    }

  };

  return declare("bpmn.Renderer", null, Renderer);
})