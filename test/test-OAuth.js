'use strict';

var assert = require('assert');
var OAuth = require('./../lib/OAuth.js');

var appId = 'wx2e23ffad9588c5cd';
var appSecret = '0097dd0c4dbdcfc5aa1ac7a020ab254e';

var oauth = new OAuth(appId, appSecret);

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