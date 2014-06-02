define([], function () {
  var GatewayRenderer = function (renderer) {
    this.render = function (gateway, group) {
      var bounds = gateway.getBounds();
      var rect = renderer.canvas.createPolygon({
        points: [ {x: 0, y: bounds.height() / 2}, // left
                  {x: bounds.width() / 2, y: 0}, // top
                  {x: bounds.width(), y: bounds.height() / 2}, // right
                  {x: bounds.width() / 2, y: bounds.height()}], // bottom
        stroke: renderer.skin()["gateway_stroke"],
        fill: renderer.skin()["gateway_fill"],
        strokeWidth: 2,
        draggable: true
      });

      group.add(rect);
      return group;
    };
  };
  return GatewayRenderer;
});