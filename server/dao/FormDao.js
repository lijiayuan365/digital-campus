const BaseDao = require('./BaseDao');
const Form = require('../models/form');

class FormDao extends BaseDao {
  constructor() {
    super(Form);
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
      .populate('fixedFlow');
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }
}

module.exports = FormDao;