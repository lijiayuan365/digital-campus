const BaseDao = require('./BaseDao');
const FixedFlow = require('../models/fixed-flow');
class FixedFlowDao extends BaseDao {
    constructor() {
        super(FixedFlow);
    }
}

module.exports = FixedFlowDao;
