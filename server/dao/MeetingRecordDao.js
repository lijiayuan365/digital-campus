const meeting = require('../models/meeting-record');
const BaseDao = require('./BaseDao');

class MeetingRecordDao extends BaseDao {
  constructor() {
    super(meeting);
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
        .populate('meeting')
        .populate('attender')
        .populate('sign')
        .populate('unSign')
        .populate('leaver');
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
  // async findAll(condition, constraints) {
  //   try {
  //     let data = await this.Model
  //       .find(condition, constraints ? constraints : null)
  //       .populate('creator', ['userName', '_id', 'avatar'])
  //       .populate('originator')
  //       .populate('participant')
  //       .populate('attender')
  //       .populate('leaver');
  //     return data;
  //   } catch (error) {
  //     console.log('findAll error--> ', error);
  //     return error;
  //   }
  // }
}

module.exports = MeetingRecordDao;