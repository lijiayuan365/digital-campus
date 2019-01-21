const BaseDao = require('./BaseDao');
const Dept = require('../models/dept');

class DeptDao extends BaseDao{
  constructor(){
    super(Dept);
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
      .populate('deptHead');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }
}

module.exports = DeptDao;