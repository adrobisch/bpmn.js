/**
 * Renderer spec
 */

define(["test/util/BpmnSpecification", "bpmn/editor/Renderer", "bpmn/util/diagram/Canvas"], function (BpmnSpecification, Renderer, Canvas) {

  var withDefinitions = BpmnSpecification.withDefinitions;

  var options = {
    container: "test",
    scale: 1
  };

  var createRendererWithCanvasSpy = function (definitions) {
    var renderer = new Renderer(definitions, options);

    spyOn(renderer.canvas, "createRect").andCallThrough();
    spyOn(renderer.canvas, "createPath").andCallThrough();
    spyOn(renderer.canvas, "createCircle").andCallThrough();
    spyOn(renderer.canvas, "createPolygon").andCallThrough();
    spyOn(renderer.canvas, "createArrowLine").andCallThrough();

    return renderer;
  };

  return describe("Renderer", function () {
    describe("simple rendering", function () {
      it("should render xor model", withDefinitions("data/test-xor.bpmn", function (definitions) {
        // given:
        var renderer = createRendererWithCanvasSpy(definitions);
        // when:
        renderer.render();
        // then:
        expect(renderer.canvas.createRect.calls.length).toEqual(4);
        expect(renderer.canvas.createPath.calls.length).toEqual(4);
        expect(renderer.canvas.createCircle.calls.length).toEqual(2);
        expect(renderer.canvas.createPolygon.calls.length).toEqual(2);
        expect(renderer.canvas.createArrowLine.calls.length).toEqual(8);
      }));

      it("should render task types", withDefinitions("data/test-tasktypes.bpmn", function (definitions) {
        // given:
        var renderer = createRendererWithCanvasSpy(definitions);
        // when:
        renderer.render();
        // then:
        expect(renderer.canvas.createRect.calls.length).toEqual(5);
        expect(renderer.canvas.createPath.calls.length).toEqual(5);
      }));
    });

  });
});