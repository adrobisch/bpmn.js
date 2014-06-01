define(["bpmn/util/JSClass",
        "lodash",
        "bpmn/Activity",
        "bpmn/Gateway",
        "bpmn/Event",
        "bpmn/SequenceFlow",
        "bpmn/util/diagram/Canvas",
        "bpmn/editor/ActivityRenderer",
        "bpmn/editor/EventRenderer",
        "bpmn/editor/GatewayRenderer",
        "bpmn/editor/LabelRenderer"],
function (jsclass, _, Activity, Gateway, Event, SequenceFlow, Canvas, ActivityRenderer, EventRenderer, GatewayRenderer, LabelRenderer) {
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

    initialize : function (definitions, options) {
      this.definitions = definitions;
      this.skinName = "default";

      this.bindDelegates();
      this.evaluateOptionsAndDefaults(options);
      this.canvas = new Canvas(this.options);
    },

    bindDelegates : function () {
      this.activity = new ActivityRenderer(this);
      this.renderEvent = new EventRenderer().render;
      this.renderGateway = new GatewayRenderer().render;
      this.label = new LabelRenderer(this);
    },

    evaluateOptionsAndDefaults : function (options) {
      this.options = options;
      this.skinName = options.skin ? options.skin : "default";
      this.options.scale = options.scale ? options.scale  : 1.0;
    },

    render :  function () {
      this.renderElements();

      this.canvas.shapeLayer.draw();
      this.canvas.connectionsLayer.draw();
      this.canvas.labelLayer.draw();
    },

    renderElements : function () {
      if (this.definitions.process().length > 1) {
        throw new Error("Only single process models are supported");
      }

      _.forEach(this.definitions.process(), function (process) {
        _.forEach(process.flowElements(), function (flowElement){
          this.renderElement(flowElement);
        }, this);
      }, this);

    },

    renderElement: function (element) {
      var group = this.canvas.createGroup({
        draggable: true
      });

      if (element instanceof SequenceFlow) {
        this.renderConnection(element, group);
        this.canvas.connectionsLayer.add(group);
      }
      else if (element instanceof Activity) {
        this.label.renderCentered(element.getBounds(), this.activity.render(element, group), element.name());
        this.canvas.shapeLayer.add(group);
        this.setGroupBounds(group, element.getBounds());
      }
      else if (element instanceof Event) {
        this.renderEvent(element, group);
        this.canvas.shapeLayer.add(group);
        this.setGroupBounds(group, this.eventBounds(element));
      }
      else if (element instanceof Gateway) {
        this.renderGateway(element, group);
        this.canvas.shapeLayer.add(group);
        this.setGroupBounds(group, element.getBounds());
      }
      else {
        console.log("unable to render flowElement", element);
      }

      this.canvas.expandCanvasIfNeeded(group);
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

    renderConnection: function (connection, group) {
      var joinedPoints = [];

      _.forEach(connection.getWaypoints(), function (point){
        joinedPoints.push(point.x);
        joinedPoints.push(point.y);
      });

      var arrow = this.canvas.createArrowLine(joinedPoints, {
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      });

      group.add(arrow);
      return group;
    },

    skin: function() {
      return this.skins[this.skinName];
    }

  };

  return new jsclass.Class(Renderer);
});