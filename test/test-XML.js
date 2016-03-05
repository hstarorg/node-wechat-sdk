'use strict';

var assert = require('assert');
var XML = require('./../lib/XML');

describe('Test XML converter', function () {
  it('Convert an object to xml', function () {
    assert.equal('<xml>\n  <name>Jay</name>\n  <text>hello</text>\n</xml>', XML.stringify({ name: 'Jay', text: 'hello' }));
  });
  it('Convert an object to xml with special characters', function () {
    assert.equal('<xml>\n  <name><![CDATA[<&>]]></name>\n  <text>hello</text>\n</xml>', XML.stringify({ name: '<&>', text: 'hello' }));
  });
  it('Convert xml content to an object use Promise', function (done) {
    var xml = '<xml><name>Good</name></xml>';
    XML.parse(xml).then((data) => {
      assert.equal('Good', data.xml.name);
      done();
    });
  });
  it('Convert xml content to an object use callback', function (done) {
    var xml = '<xml><name>Good</name></xml>';
    XML.parse(xml, (err, data) => {
      assert.equal('Good', data.xml.name);
      done();
    });
  })
});