'use strict';

var xml2js = require('xml2js');

var defaultBuilder = new xml2js.Builder({
  rootName: 'xml',
  cdata: true,
  headless: true
});

var defaultParseOptions = {
  explicitArray: false,
  ignoreAttrs: true
};

/**
 * 异步转换xml文本到对象
 * @param xml 要转换的内容
 * @param [options] 转换参数
 * @param [callback] 回调函数
 */
var parse = (xml, options, callback) => {
  if (options && typeof options === 'function') {
    callback = options;
    options = null;
  }
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, options || defaultParseOptions, (err, data) => {
      if (err) {
        callback && callback(err);
        return reject(err);
      }
      callback && callback(null, data);
      resolve(data);
    });
  });
};

/**
 * 将对象转换为xml文档
 * @param obj 要转换的对象
 * @param [options] 转换时的参数对象
 */
var stringify = (obj, options) => {
  var builder;
  if (options && typeof options === 'object') {
    builder = new xml2js.Builder(options);
  } else {
    builder = defaultBuilder;
  }
  return builder.buildObject(obj);
};

module.exports = {
  parse: parse,
  stringify: stringify
};