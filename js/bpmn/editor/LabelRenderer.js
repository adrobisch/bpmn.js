define([], function () {

  var Label = function (renderer) {
    this.renderCentered = function (bounds, group, labelText) {
      var text = this.createLabelText(labelText, bounds);
      var updatedProperties = {
        top: bounds.height() / 2 - text.getFontSize() / 2,
        left: bounds.width() / 2 - text.getWidth() / 2
      };

      //text.set(updatedProperties).setCoords();

      group.add(text);
      return group;
    };

    this.createLabelText = function (text, bounds) {
      return renderer.canvas.createText({
        text: text.replace(/\\n/g, "\n"),
        width: bounds.width(),
        height: bounds.height(),
        fontSize: renderer.skin()["label_font_size"],
        fontFamily: renderer.skin()["label_font_family"],
        fill: renderer.skin()["label_fill"]
      });
    };

  };
  return Label;
});