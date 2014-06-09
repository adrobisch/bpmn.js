function stubbedCanvas(renderer) {
  var expandStub = sinon.stub(renderer.canvas, "expandCanvasIfNeeded");
  var createCircleStub = sinon.stub(renderer.canvas, "createCircle");
  var createRect = sinon.stub(renderer.canvas, "createRect");
  var createPolygon = sinon.stub(renderer.canvas, "createPolygon");
  var createPath = sinon.stub(renderer.canvas, "createPath");
  var createArrowLine = sinon.stub(renderer.canvas, "createArrowLine");
  var createGroupStub = sinon.stub(renderer.canvas, "createGroup", function(){
    return {
      add: function (){},
      set: function (){
        return {
          setCoords: function () {}
        }
      }
    }
  });

  return {
    rectangles: function () {
      return createRect.callCount;
    },
    expanded: function() {
      return expandStub.callCount;
    },
    circles: function () {
      return createCircleStub.callCount;
    },
    polygons: function() {
      return createPolygon.callCount;
    },
    paths: function() {
      return createPath.callCount;
    },
    arrows: function () {
      return createArrowLine.callCount;
    },
    groups: function () {
      return createGroupStub.callCount;
    }
  }
}