const mongoose = require('mongoose');
const { mongoClient } = require('../util/mongo');
let Schema = mongoose.Schema;

const formData = new mongoose.Schema({
  formTitle: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  status: Number,
  approvalRecords: Array,
  form: { type: Schema.Types.ObjectId, ref: 'Form' },
  formValues: Array,
  formType: Number,
  formFlow: Object,
  currentNode: Object,
  nextNode: Object,
  freeFlow: Array,
}, { versionKey: false });

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let FormData = mongoClient.model('FormData', formData, 'form-data');

module.exports = FormData;