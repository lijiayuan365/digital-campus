const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { mongoClient } = require('../util/mongo');

// 创建 user Schema
const askLeave = new mongoose.Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  leaveType: String,
  leaveTitle: String,
  leaveContent: String,
  fileList:Array,
  leaveTime: String,
  startTime: String,
  endTime: String,
  createTime: Date,
  status: Number,
  approvalRecords:Array,
  flow: Object,
  currentNode: Object,
  ccPerson: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { versionKey: false });

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let AskLeave = mongoClient.model('AskLeave', askLeave, 'ask-leave');

module.exports = AskLeave;