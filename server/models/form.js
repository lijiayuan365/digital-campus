const mongoose = require('mongoose');
const {mongoClient} = require('../util/mongo');
// let Schema = mongooose.Schema;

const form = new mongoose.Schema({
  creator:String,
  formName:String,
  formGroup:String,
  formType:String,
  formTitle:String,
  formDesc:String,
  fieldList:Array,
  formSetting:Object,
  formFlow:Object,
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let Form = mongoClient.model('Form', form, 'form');

module.exports = Form;