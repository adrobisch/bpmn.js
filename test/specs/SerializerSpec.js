describe('Serializer', function(){
  describe('#fromXML()', function(){
    it('should deserialize A.1.0', withData("test/data/reference/A.1.0.bpmn", function (bpmnXml) {
      var bpmn = new Bpmn();

      var definitions = bpmn.fromXML(bpmnXml);

      should.exist(definitions);
      assert.lengthOf(definitions.process(), 1);

      var process = definitions.process()[0];
      var flowElements = definitions.process()[0].flowElements();

      assert.isFalse(process.isExecutable());
      assert.lengthOf(flowElements, 9);
      assertElementCount(flowElements, "task", 3);
      assertElementCount(flowElements, "sequenceFlow", 4);
      assertElementCount(flowElements, "startEvent", 1);
      assertElementCount(flowElements, "endEvent", 1);

      should.exist(definitions.bpmnDiagram());
      should.exist(definitions.bpmnDiagram().plane());

      var diagramElements = definitions.bpmnDiagram().plane().diagramElements();
      assertElementCount(diagramElements, "BPMNShape", 5);
      assertElementCount(diagramElements, "BPMNEdge", 4);

      console.log(diagramElements[0].label().bounds());

      var startEvent = definitions.index.item("_93c466ab-b271-4376-a427-f4c353d55ce8");
      should.exist(startEvent);
      should.exist(startEvent.getBounds());
      assert.equal(startEvent.getBounds().x(), 186.0);
      assert.equal(startEvent.getBounds().y(), 336.0);
      assert.equal(startEvent.getBounds().width(), 30.0);
      assert.equal(startEvent.getBounds().height(), 30.0);
      assert.equal(startEvent.getLabel().bounds().x(), 153.67766754457273);
      assert.equal(startEvent.getLabel().bounds().y(), 371.3333333333333);
      assert.equal(startEvent.getLabel().bounds().width(), 94.93333333333335);
      assert.equal(startEvent.getLabel().bounds().height(), 12.804751171875008);
    }));

    it('should deserialize subprocess model', withData("test/data/test-subprocess.bpmn", function(bpmnXml){
      var bpmn = new Bpmn();
      var definitions = bpmn.serializer.fromXML(bpmnXml);

      should.exist(definitions);
      assert.lengthOf(definitions.process(), 1);

      var process = definitions.process()[0];
      var flowElements = definitions.process()[0].flowElements();

      assert.isFalse(process.isExecutable());

      assertElementCount(flowElements, "sequenceFlow", 9);
      assertElementCount(flowElements, "endEvent", 3);
      assertElementCount(flowElements, "startEvent", 1);
      assertElementCount(flowElements, "userTask", 1);
      assertElementCount(flowElements, "serviceTask", 1);
      assertElementCount(flowElements, "exclusiveGateway", 1);
      assertElementCount(flowElements, "parallelGateway", 1);
      assertElementCount(flowElements, "boundaryEvent", 2);
      assertElementCount(flowElements, "subProcess", 1);
      assert.lengthOf(flowElements, 20);

      var subProcess = definitions.index.item("sid-5EC18B61-6E3C-4AEF-94E4-3D8F45AD9B7E");
      assert.lengthOf(subProcess.flowElements(), 5);

      var startEvent = definitions.index.item("sid-04A494EF-7D56-4E81-80D9-7F89CDC2ACF4");
      assert.equal(startEvent.outgoing().length, 1);

      var parallelGateway = definitions.index.item("sid-6E6B3941-46F9-4E74-9288-FA20CFF70A1E");
      assert.equal(parallelGateway.incoming().length, 2);
    }));

    it('should deserialize empty process model', withData("test/data/test-empty-process.bpmn", function(bpmnXml){
      var bpmn = new Bpmn();

      var definitions = bpmn.serializer.fromXML(bpmnXml);

      should.exist(definitions);
      assert.lengthOf(definitions.process(), 1);
      assert.isFalse(definitions.process()[0].isExecutable());
    }));
  })
});