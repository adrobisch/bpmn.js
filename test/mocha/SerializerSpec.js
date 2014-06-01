var chai = require('chai'),
    assert = chai.assert,
    should = chai.should();

var _ = require("lodash");

var fs = require("fs"),
    Bpmn = require("../../lib/bpmn.combined");

function assertElementCount(elements, tag, expectedCount) {
  var currentCount = 0;

  _.forEach(elements, function (element) {
    if (element.tag == tag) {
      currentCount++;
    }
  });

  assert.equal(currentCount, expectedCount, tag + ' element count');
}

describe('Serializer', function(){
  describe('#fromXML()', function(){
    it('should deserialize A.1.0 model', function(){
      var bpmnXml = fs.readFileSync("test/data/reference/A.1.0.bpmn").toString();
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

      var startEvent = definitions.index.item("_93c466ab-b271-4376-a427-f4c353d55ce8");
      should.exist(startEvent);
      should.exist(startEvent.getBounds());
      assert.equal(startEvent.getBounds().x(), 186.0);
      assert.equal(startEvent.getBounds().y(), 336.0);
    });

    it('should deserialize subprocess model', function(){
      var bpmnXml = fs.readFileSync("test/data/test-subprocess.bpmn").toString();
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
    });

    it('should deserialize empty process model', function(){
      var bpmnXml = fs.readFileSync("test/data/test-empty-process.bpmn").toString();
      var bpmn = new Bpmn();

      var definitions = bpmn.serializer.fromXML(bpmnXml);

      should.exist(definitions);
      assert.lengthOf(definitions.process(), 1);
      assert.isFalse(definitions.process()[0].isExecutable());
    });
  })
});