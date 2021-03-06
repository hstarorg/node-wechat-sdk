'use strict';

var util = require('./util');

class OAuthApi {
  constructor(appId, appSecret) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.accessToken = null;
    this.expiresDate = 0;
  }
  getOAuthToken(callback) {
    var self = this;
    var uri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`;
    return new Promise((resolve, reject) => {
      util.getRightJson(uri)
        .then((data) => {
          self.accessToken = data.access_token;
          self.expiresDate = Date.now() + data.expires_in * 1000;
          callback && callback(null, self.accessToken);
          resolve(self.accessToken);
        })
        .catch((err) => {
          callback && callback(err);
          reject(err);
        });
    });
  }
  getWeChatServerIPs(accessToken, callback) {
    var uri = `https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=${accessToken}`;
    return new Promise((resolve, reject) => {
      util.getRightJson(uri)
        .then((data) => {
          callback && callback(null, data.ip_list);
          resolve(data.ip_list);
        }).catch((err) => {
          callback && callback(err);
          reject(err);
        })
    });
  }
}

module.exports = OAuthApi;