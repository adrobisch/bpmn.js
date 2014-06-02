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
        "sequence_flow_stroke": 'black',
        "event_stroke" : 'black',
        "event_fill" : 'white',
        "activity_stroke" : 'black',
        "activity_fill" : 'white',
        "activity_corner_radius" : 10,
        "gateway_stroke" : 'black',
        "gateway_fill" : 'white',
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
      this.event = new EventRenderer(this);
      this.gateway = new GatewayRenderer(this);
      this.label = new LabelRenderer(this);
    },

    evaluateOptionsAndDefaults : function (options) {
      this.options = options;
      this.skinName = options.skin ? options.skin : "default";
      this.options.scale = options.scale ? options.scale  : 1.0;
    },

    render :  function () {
      this.renderElements();
      this.canvas.draw();
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
        this.canvas.addConnection(group);
      }
      else if (element instanceof Activity) {
        var activityGroup = this.activity.render(element, group);
        this.label.renderCentered(element.getBounds(), activityGroup, element.name());
        this.canvas.addShape(group);
        this.setGroupBounds(group, element.getBounds());
      }
      else if (element instanceof Event) {
        this.event.render(element, group);
        this.canvas.addShape(group);
        this.setGroupBounds(group, this.eventBounds(element));
      }
      else if (element instanceof Gateway) {
        this.gateway.render(element, group);
        this.canvas.addShape(group);
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
        x: function () {return bounds.x() },
        y: function () {return bounds.y() },
        width: function () {return bounds.width()},
        height: function () {return bounds.height()}
      };
    },

    setGroupBounds : function (group, bounds, offset) {
      var offset = offset ? offset: 0;

      var coords = {
        left: bounds.x() + offset,
        top: bounds.y() + offset,
        width: bounds.width(),
        height: bounds.height()
      };

      group.set(coords).setCoords();
    },

    renderConnection: function (connection, group) {
      var arrow = this.canvas.createArrowLine(connection.getWaypoints(), {
        stroke: this.skin()["sequence_flow_stroke"],
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