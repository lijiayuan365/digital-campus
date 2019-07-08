const mongoose = require('mongoose');
const { mongoClient } = require('../util/mongo');
let Schema = mongoose.Schema;

const meeting = new mongoose.Schema({
  title: String,
  desc: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  createTime: String,
  meetingRoom: String,
  startTime: String,
  endTime: String,
  enclosure: Array,
  status: Number,
  originator:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  participant: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status:Number,
  // attender: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // leaver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // sign: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 签到的人
  // unSign: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 未签到的人
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let Meeting = mongoClient.model('Meeting', meeting, 'meeting');

module.exports = Meeting;