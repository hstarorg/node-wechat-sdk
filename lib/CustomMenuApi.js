'use strict';

var util = require('./util');
var BaseWechatApi = require('./BaseWechatApi');

class CustomMenuApi extends BaseWechatApi {
  constructor(accessToken) {
    super();
    this.accessToken = accessToken;
  }
  //自定义菜单查询
  getCustomMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=';
    return this.processGetApi((data) => data, uri, callback, accessToken);
  }
  //自定义菜单删除
  deleteCustomMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=';
    return this.processGetApi((data) => data.errcode === 0, uri, callback, accessToken);
  }
  //获取公众号的菜单配置
  getCurrentSelfMenu(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=';
    return this.processGetApi((data) => data, uri, callback, accessToken);
  }
  //自定义菜单创建
  createCustomMenu(menuObj, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=';
    return this.processPostApi((data) => data, uri, menuObj, callback, accessToken);
  }
  //获取个性化菜单
  getPersonalizedMenu() {
    return this.getCurrentSelfMenu();
  }
  //创建个性化菜单
  createPersonalizedMenu(menuObj, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=';
    return this.processPostApi((data) => data, uri, menuObj, callback, accessToken);
  }
  //删除个性化菜单
  deletePersonalizedMenu(menuId, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=';
    return this.processPostApi((data) => data.errcode === 0, uri, { menuid: menuId }, callback, accessToken);
  }
  //匹配个性化菜单
  matchPersonalizedMenu(userId, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=';
    return this.processPostApi((data) => data, uri, { user_id: userId }, callback, accessToken);
  }
}

module.exports = CustomMenuApi;