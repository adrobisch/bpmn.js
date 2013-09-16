define([], function () {

  var Label = function (renderer) {
    this.renderCentered = function (bounds, group, labelText) {
      var text = this.createLabelText(labelText);
      text.setY(bounds.height()/2 - text.getFontSize());
      text.setWidth(bounds.width());

      group.add(text);
      return group;
    };

    this.createLabelText = function (text) {
      return renderer.canvas.createText({
        text: text,
        fontSize: renderer.skin()["label_font_size"],
        fontFamily: renderer.skin()["label_font_family"],
        fill: renderer.skin()["label_fill"],
        align: 'center'
      });
    };

  };
  return Label;
});