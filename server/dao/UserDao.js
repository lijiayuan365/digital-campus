let BaseDao = require('./BaseDao');
let User = require('../models/user');

class UserDao extends BaseDao {
  constructor() {
    super(User);
  }
}

module.exports = UserDao;