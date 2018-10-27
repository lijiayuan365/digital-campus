const BaseDao = require('./BaseDao');
const Post = require('../models/post');

class PostDao extends BaseDao {
  constructor() {
    super(Post);
  }
}

module.exports = PostDao;