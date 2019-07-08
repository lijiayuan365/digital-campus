const router = require('../../util/router-util');
const FixedFlowService = require('../../service/manager/FixedFlowService');
const OK_CODE = 0;
let flowService = new FixedFlowService();

router.get('/getFixedFlowList', (req, res) => {
  flowService.getFlowList().then((data) => {
    res.json({
      code: OK_CODE,
      mgs: '',
      data: data,
    });
  });
});
router.get('/getFixedFlow', (req, res) => {
  let flowId = req.query.flowId;
  flowService.getFlow(flowId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.post('/addFixedFlow', (req, res) => {
  let flow = req.body.flowData;
  flowService.addFlow(flow).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/removeFixedFlow', (req, res) => {
  let flowId = req.body.flowId;
  flowService.removeFlow(flowId).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/updateFixedFlow', (req, res) => {
  let flow = req.body.flowData
  flowService.updateFlow(flow).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.get('/getFlowGroup', (req, res) => {
  flowService.getFlowGroup().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
module.exports = router;