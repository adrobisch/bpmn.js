/*
 * All functionality is normally tested against karma and a browser.
 * This test exists to make sure there is nothing fundamentally broken
 * with the node support and dependencies
 *
 * FIXME: it should be possible to run all specs server-side
 */

var chai = require('chai'),
    assert = chai.assert,
    should = chai.should();

var _ = require("lodash");

var fs = require("fs"),
    Bpmn = require("../../lib/bpmn.combined"),
    canvasOutput = fs.createWriteStream(__dirname + '/canvasOutput.png');

function testDefinitions() {
  var bpmnXml = fs.readFileSync("test/data/test-and.bpmn").toString();
  var bpmn = new Bpmn();

  return bpmn.fromXML(bpmnXml);
}

describe('Bpmn', function () {
  it('should load definitions from file', function () {
    var definitions = testDefinitions();

    should.exist(definitions);
    assert.lengthOf(definitions.process(), 1);
  });

  it('should create an instance', function () {
    var definitions = testDefinitions();

    new Bpmn().instance(definitions).start("StartEvent_1");
  });

  it('should render to file', function () {
    var definitions = testDefinitions();

    var options = {
      container: "canvas",
      scale: 1
    };

    var renderer = new Bpmn().renderer(definitions, options);
    renderer.render();

    var stream = renderer.canvas.canvas.createPNGStream();
    stream.on('data', function(chunk) {
      canvasOutput.write(chunk);
    });
  });
});