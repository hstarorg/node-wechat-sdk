'use strict';

var util = require('./util');

class CustomMenu {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
  processApi(processFn, uri, callback, accessToken) {
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
  //自定义菜单查询
  getCustomMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=';
    return this.processApi((data) => () => data, uri, callback, accessToken);
  }
  //自定义菜单删除
  deleteCustomMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=';
    return this.processApi((data) => () => data.errcode === 0, uri, callback, accessToken);
  }
  //获取公众号的菜单配置
  getCurrentSelfMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=';
    return this.processApi((data) => data, uri, callback, accessToken);
  }
  //自定义菜单创建
  createCustomMenu(menuObj, callback, accessToken) {
    accessToken = accessToken || this.accessToken;
    if (!accessToken) {
      throw 'accessToken required.';
    }
    var uri = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`;
    return new Promise((resolve, reject) => {
      util.getRightJson(uri, 'POST', JSON.stringify(menuObj))
        .then((data) => {
          callback && callback(null, true);
          resolve(true);
        })
        .catch((err) => {
          callback && callback(err);
          reject(err);
        });
    });
  }
  //获取个性化菜单
  getPersonalizedMenu(){
    
  }
}

module.exports = CustomMenu;