'use strict';

var assert = require('assert');
var OAuthApi = require('./../lib/OAuthApi.js');
var testConfig = require('./test-config');

var api = new OAuthApi(testConfig.appId, testConfig.appSecret);

describe('Test OAuth function', function () {
  it('Test get access token', function (done) {
    api.getOAuthToken((err, token) => {
      assert.equal(null, err);
      assert.notEqual(null, token);
      assert.equal(true, token === api.accessToken);
      console.log(token);
      done();
    });
  });

  it('Test get wechat server IPs', function (done) {
    api.getWeChatServerIPs(api.accessToken).then((data) => {
      assert.equal(true, data.length > 0);
      done();
    })
  });
});