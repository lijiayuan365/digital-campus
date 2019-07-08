const BaseDao = require('./BaseDao');
const LeaveType = require('../models/leave-type');

class LeaveTypeDao extends BaseDao {
  constructor() {
    super(LeaveType);
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
      .populate('flow');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }
}

module.exports = LeaveTypeDao;