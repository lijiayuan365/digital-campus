const BaseDao = require('./BaseDao');
const Org = require('../models/org');

class OrgDao extends BaseDao{
  constructor(){
    super(Org)
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
      .populate('orgHead');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }
}

module.exports = OrgDao;

