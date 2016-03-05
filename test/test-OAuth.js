'use strict';

var assert = require('assert');
var OAuth = require('./../lib/OAuth.js');
var testConfig = require('./test-config');

var oauth = new OAuth(testConfig.appId, testConfig.appSecret);

describe('Test OAuth function', function () {
  it('Test get access token', function (done) {
    oauth.getOAuthToken((err, token) => {
      assert.equal(null, err);
      assert.notEqual(null, token);
      assert.equal(true, token === oauth.accessToken);
      done();
    });
  });

  it('Test get wechat server IPs', function (done) {
    oauth.getWeChatServerIPs(oauth.accessToken).then((data) => {
      assert.equal(true, data.length > 0);
      done();
    })
  });
});