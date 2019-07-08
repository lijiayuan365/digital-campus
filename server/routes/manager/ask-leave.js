const router = require('../../util/router-util');
const AskLeaveService = require('../../service/manager/AskLeaveService');
const LeavaTypeService = require('../../service/manager/LeaveTypeService');

const OK_CODE = 0;
const API = '/manager/ask-leave';
let askLeaveService = new AskLeaveService();
let leaveTypeService = new LeavaTypeService();

router.get('/demo', function (req, res, next) {
  res.send('hello manager')
});
router.get('/getAskLeaveList', (req, res) => {
  askLeaveService.getAskLeaveList().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.get('/getAskLeave', (req, res) => {
  let askLeaveId = req.query.leaveId;
  askLeaveService.getAskLeave(askLeaveId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data:data,
    });
  });
});
router.post('/addAskLeave', (req, res) => {
  let askLeaveData = req.body.leaveData;
  askLeaveService.addAskLeave(askLeaveData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/removeAskLeave', (req, res) => {
  let askLeaveId = req.body.leaveId;
  askLeaveService.removeAskLeave(askLeaveId).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post(`${API}/updateAskLeave`, (req, res) => {
  let askLeaveData = req.body.leaveData
  askLeaveService.updateAskLeave(askLeaveData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});

router.get('/getLeaveTypeList', (req, res) => {
  leaveTypeService.getLeaveTypeList().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.get('/getLeaveType', (req, res) => {
  let leaveTypeId = req.query.typeId;
  leaveTypeService.getLeaveType(leaveTypeId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data:data,
    });
  });
});
router.post('/addLeaveType', (req, res) => {
  let leaveTypeData = req.body.typeData;
  leaveTypeService.addLeaveType(leaveTypeData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/removeLeaveType', (req, res) => {
  let typeId = req.body.typeId;
  leaveTypeServicee.removeAskLeave(typeId).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post(`${API}/updateLeaveType`, (req, res) => {
  let typeData = req.body.typeData
  leaveTypeService.updateLeaveType(typeData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
module.exports = router;