'use strict';

var util = require('./util');
var BaseWechatApi = require('./BaseWechatApi');

class UserManageApi extends BaseWechatApi {
  constructor(accessToken) {
    super();
    this.accessToken = accessToken;
  }
  
}

module.exports = UserManageApi;