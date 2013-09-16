define([], function () {
  var ActivityRenderer = function () {
    this.render = function (activity, group) {
      var bounds = activity.getBounds();
      var cornerRadius = this.skin()["activity_corner_radius"];

      var rect = this.canvas.createRect({
        width: bounds.width(),
        height: bounds.height(),
        "cornerRadius": cornerRadius,
        stroke: this.skin()["activity_stroke"],
        fill: this.skin()["activity_fill"],
        strokeWidth: 2
      });

      group.add(rect);
      return group;
    };
  };
  return ActivityRenderer;
});