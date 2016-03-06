'use strict';

var assert = require('assert');
var CustomMenuApi = require('./../lib/CustomMenuApi.js');
var testConfig = require('./test-config');

var api = new CustomMenuApi(testConfig.accessToken);

describe('Test CustomMenu function', function () {
  it('Test get custom menu', function (done) {
    api.getCustomMenu((err, result) => {
      console.log(err, result);
      assert.equal(null, err);
      assert.notEqual(null, result);
      assert.notEqual(null, result.menu);
      done();
    })
  });
  it('Test get current menu', function (done) {
    api.getCurrentSelfMenu((err, result) => {
      assert.equal(null, err);
      assert.notEqual(null, result);
      assert.notEqual(null, result.is_menu_open);
      assert.notEqual(null, result.selfmenu_info);
      done();
    })
  });
  it('Test delete custom menu', function (done) {
    api.deleteCustomMenu((err, result) => {
      assert.equal(null, err);
      assert.equal(true, result);
      done();
    })
  });
});