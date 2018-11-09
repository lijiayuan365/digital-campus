const mongoose = require('mongoose');
const { mongoClient } = require('../util/mongo')
let Schema = mongoose.Schema;

const post = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  postId: String,
  postName: String,
  deptId: String
});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let Post = mongoClient.model('Post', post, 'post');

module.exports = Post;