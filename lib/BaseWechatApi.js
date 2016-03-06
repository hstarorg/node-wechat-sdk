'use strict';

var util = require('./util');

class BaseWechatApi {
  constructor() {

  }
  //处理GET API
  processGetApi(processFn, uri, callback, accessToken) {
    accessToken = accessToken || this.accessToken;
    if (!accessToken) {
      throw 'accessToken required.';
    }
    uri = uri += accessToken;
    return new Promise((resolve, reject) => {
      util.getRightJson(uri)
        .then((data) => {
          data = processFn(data);
          callback && callback(null, data);
          resolve(data);
        })
        .catch((err) => {
          callback && callback(err);
          reject(err);
        });
    });
  }
  //处理POST API
  processPostApi(processFn, uri, data, callback, accessToken) {
    accessToken = accessToken || this.accessToken;
    if (!accessToken) {
      throw 'accessToken required.';
    }
    uri = uri += accessToken;
    return new Promise((resolve, reject) => {
      util.getRightJson(uri, 'POST', data)
        .then((data) => {
          data = processFn(data);
          callback && callback(null, data);
          resolve(data);
        })
        .catch((err) => {
          callback && callback(err);
          reject(err);
        });
    });
  }
}

module.exports = BaseWechatApi;