const BaseDao = require('./BaseDao');
const Organization = require('../models/organization');

class OrgDao extends BaseDao{
  constructor(){
    super(Organization)
  }
}

module.exports = OrgDao;

