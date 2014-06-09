describe('Renderer', function () {
  it('should render xor model', withData("test/data/test-xor.bpmn", function (bpmnXml) {
        // given
        var options = {
          container: "example",
          scale: 1
        };

        var bpmn = new Bpmn();
        var definitions = new Bpmn().fromXML(bpmnXml);

        var renderer = bpmn.renderer(definitions, options);
        var canvas = stubbedCanvas(renderer);

        // when
        renderer.render();
        // then
        assert.equal(canvas.expanded(), 16);
        assert.equal(canvas.circles(), 2);
        assert.equal(canvas.polygons(), 2);
        assert.equal(canvas.rectangles(), 4);
        assert.equal(canvas.paths(), 4);
        assert.equal(canvas.arrows(), 8);
      })
  );
});