const mongoose = require('mongoose');
const {mongoClient} = require('../util/mongo');


// 创建 user Schema
const user = new mongoose.Schema({
  userId:String,
  userName:String,
  pwd: String,
  openid:String,
  avatar:String,
  deptId:String,
  organizeId:String,
  post:String,
  tel:Number,
  email:String,
  remark:String,
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let User = mongoClient.model('User',user,'user');

module.exports = User;
