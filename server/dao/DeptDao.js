const BaseDao = require('./BaseDao');
const Dept = require('../models/dept');

class DeptDao extends BaseDao{
  constructor(){
    super(Dept);
  }
}

module.exports = DeptDao;