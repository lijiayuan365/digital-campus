const mongoose = require('mongoose');
const { mongoClient } = require('../util/mongo');
let Schema = mongoose.Schema;

// 创建 Schema
const leaveType = new mongoose.Schema({
  typeName: String,
  typeTitle: String,
  typeContent: String,
  visitType: Number,
  visitPerson: Array,
  flow: { type: Schema.Types.ObjectId, ref: 'fixedFlow' },
  ccPerson: Array,
  setting: Object,
  status: Number,
}, { versionKey: false });

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let LeaveType = mongoClient.model('LeaveType', leaveType, 'leave-type');

module.exports = LeaveType;