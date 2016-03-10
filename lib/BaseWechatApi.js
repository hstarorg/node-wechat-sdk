'use strict';

var util = require('./util');

class BaseWechatApi {
  constructor(accessToken) {
    if(!accessToken){
      throw new Error('accessToken required.');
    }
    this.accessToken = accessToken;
  }
  //处理GET API
  processGetApi(processFn, uri, callback) {
    uri = uri + this.accessToken;
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
  processPostApi(processFn, uri, data, callback) {
    uri = uri + this.accessToken;
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