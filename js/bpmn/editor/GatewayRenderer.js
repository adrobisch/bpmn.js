define([], function () {
  var GatewayRenderer = function () {
    this.render = function (gateway, group) {
      var bounds = gateway.getBounds();
      var rect = this.canvas.createPolygon({
        points: [0, bounds.height() / 2, // left
          bounds.width() / 2, 0, // top
          bounds.width(), bounds.height() / 2, // right
          bounds.width() / 2, bounds.height()], // bottom
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
      });

      group.add(rect);
      return group;
    };
  };
  return GatewayRenderer;
});