define(["lodash", "bpmn/EndEvent"], function (_, EndEvent) {
  var EventRenderer = function (renderer) {
    this.typeProperties = function (event) {
      if (event instanceof EndEvent) {
        return {
          strokeWidth: 4
        }
      }
      return {};
    };

    this.render = function (event, group) {
      var bounds = event.getBounds();

      var eventProperties = {
        left: 0,
        top: 0,
        width: bounds.width(),
        height: bounds.height(),
        fill: renderer.skin()["event_fill"],
        stroke: renderer.skin()["event_stroke"],
        strokeWidth: 2
      };

      _.extend(eventProperties, this.typeProperties(event));

      eventProperties.width += eventProperties.strokeWidth * 2;
      eventProperties.height += eventProperties.strokeWidth * 2;

      var circle = renderer.canvas.createCircle(eventProperties);
      group.add(circle);
      return group;
    };
  };
  return EventRenderer;
});