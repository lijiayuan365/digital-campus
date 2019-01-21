let BaseDao = require('./BaseDao');
let User = require('../models/user');

class UserDao extends BaseDao {
  constructor() {
    super(User);
  }
  /**
   * 查找符合条件的第一条 doc
   *
   * @param condition
   * @param constraints
   * @returns {Promise}
   */
  async findOne(condition, constraints) {
    try {
      let data = await this.Model
        .findOne(condition, constraints ? constraints : null)
        .populate('dept', ['deptName', 'deptNo'])
        .populate('org')
        .populate('post');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }
  /**
   * 查询所有符合条件 docs
   *
   * @param condition 查找条件
   * @param constraints
   * @returns {Promise}
   */
  async findAll(condition, constraints) {
    try {
      let data = await this.Model
        .find(condition, constraints ? constraints : null)
        .populate('dept', ['deptName', 'deptNo'])
        .populate('org')
        .populate('post');
      return data;
    } catch (error) {
      console.log('findAll error--> ', error);
      return error;
    }
  }
}

module.exports = UserDao;