const BaseDao = require('./BaseDao');
const Form = require('../models/form');

class FormDao extends BaseDao {
  constructor() {
    super(Form);
  }
}

module.exports = FormDao;