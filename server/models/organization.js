const mongoose = require('mongoose');
const {mongoClient} = require('../util/mongo');
let Schema = mongoose.Schema;

const organization = new mongoose.Schema({
  _id:Schema.Types.ObjectId,
  orgId:String,
  orgName:String,
  orgHead:Array
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let Organization = mongoClient.model('Organization', organization, 'organization');
module.exports = Organization;