'use strict';

var request = require('request');
var errcode = require('./errcode.json');
var XML = require('./XML');

/**
 * 请求远端数据
 * @param uri URI
 * @param method HTTP请求Verb
 * @param body 提交的内容
 * @param options Request请求参数
 */
var requestRemoteData = (uri, method, body, options) => {
  options = options || {};
  options.uri = uri;
  if (method) {
    options.method = method;
  }
  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
    options.body = body;
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

/**
 * 请求远端数据
 * @param uri URI
 * @param method HTTP请求Verb
 * @param body 提交的内容
 * @param options Request请求参数
 */
var getRightJson = (uri, method, body, options) => {
  return new Promise((resolve, reject) => {
    requestRemoteData(uri, method, body, options)
      .then((res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Request error,statusCode:${res.statusCode}, body: ${res.body}`));
        }
        var result = JSON.parse(res.body);
        if (result.errcode && result.errcode !== 0) {
          return reject(new Error(`Wechat return error: ${errcode['' + result.errcode]}`));
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  requestRemoteData: requestRemoteData,
  getRightJson: getRightJson
};