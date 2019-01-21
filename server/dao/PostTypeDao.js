const BaseDao = require('./BaseDao');
const PostType = require('../models/post-type');

class PostTypeDao extends BaseDao{
  constructor(){
    super(PostType);
  }
}

module.exports = PostTypeDao;