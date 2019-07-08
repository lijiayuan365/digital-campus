const BaseDao = require('./BaseDao');
const Askleave = require('../models/ask-leave');

class AskleaveDao extends BaseDao {
  constructor() {
    super(Askleave);
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
        .populate('creator', ['userName', '_id', 'avatar'])
        .populate('ccPerson');
      return data;
    } catch (error) {
      console.log('findAll error--> ', error);
      return error;
    }
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
      let data = await this.Model.
        findOne(condition, constraints ? constraints : null)
        .populate('creator', ['userName', '_id', 'avatar'])
        .populate('ccPerson');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }

}

module.exports = AskleaveDao;