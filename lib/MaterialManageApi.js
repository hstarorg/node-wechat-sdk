'use strict';

var util = require('./util');
var BaseWechatApi = require('./BaseWechatApi');

class MaterialManageApi extends BaseWechatApi {
  constructor(accessToken) {
    super();
    this.accessToken = accessToken;
  }
  //新增临时素材
  createTemporaryMaterial() {

  }
  //获取临时素材
  getTemporaryMaterial() {

  }
  //新增永久素材
  createPermanentMaterial() {

  }
  //更新永久素材（图文素材）
  updatePermanentMaterial() {

  }
  //获取永久素材
  getPermanentMaterial() {

  }
  //删除永久素材
  deletePermanentMaterial(materialId, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=';
    return this.processPostApi((data) => true, uri, { media_id: materialId }, callback, accessToken);
  }
  //获取素材总数（永久素材）
  getMaterialCount(callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=';
    return this.processGetApi((data) => data, uri, callback, accessToken);
  }
  //获取素材列表(永久素材)
  getMaterialList(materialType, startIdx, count, callback, accessToken) {
    var uri = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=';
    var postData = {
      type: materialType,
      offset: startIdx,
      count: count
    };
    return this.processPostApi((data) => data, uri, postData, callback, accessToken);
  }
}

module.exports = MaterialManageApi;