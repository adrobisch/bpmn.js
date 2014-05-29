require('amdefine/intercept');

var chai = require('chai')
    , assert = chai.assert
    , should = chai.should();

var fs = require("fs"),
    Bpmn = require("../../lib/bpmn.combined");

describe('Serializer', function(){
  describe('#fromXML()', function(){
    it('should deserialize subprocess model', function(){
      var bpmnXml = fs.readFileSync("test/data/test-subprocess.bpmn").toString();
      var bpmn = new Bpmn();

      var definitions = bpmn.serializer.fromXML(bpmnXml);

      should.exist(definitions);
      assert.lengthOf(definitions.process(), 1);
      assert.isFalse(definitions.process()[0].isExecutable());
      assert.lengthOf(definitions.process()[0].flowElements(), 20);
    })
  })
});