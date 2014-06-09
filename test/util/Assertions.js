var assert = chai.assert,
    should = chai.should();

function assertElementCount(elements, tag, expectedCount) {
  var currentCount = 0;

  _.forEach(elements, function (element) {
    if (element.tag == tag) {
      currentCount++;
    }
  });

  assert.equal(currentCount, expectedCount, tag + ' element count');
}