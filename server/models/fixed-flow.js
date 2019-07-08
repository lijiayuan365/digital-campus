const mongoose = require('mongoose');
const { mongoClient } = require('../util/mongo');
// let Schema = mongooose.Schema;

const fixedFlow = new mongoose.Schema({
  flowName: String,
  flowGroup: String,
  flow: Object,
  createTime: String,
  status: Number,
  desc: String,
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let FixedFlow = mongoClient.model('fixedFlow', fixedFlow, 'fixed-flow');

module.exports = FixedFlow;