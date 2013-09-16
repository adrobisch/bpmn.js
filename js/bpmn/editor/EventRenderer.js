define([], function () {
  var EventRenderer = function () {
    this.render = function (event, group) {
      var bounds = event.getBounds();
      var circle = this.canvas.createCircle({
        width: bounds.width(),
        height: bounds.height(),
        stroke: this.skin()["event_stroke"],
        strokeWidth: 2,
        draggable: true
      });

      group.add(circle);
      return group;
    };
  };
  return EventRenderer;
});