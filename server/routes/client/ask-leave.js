const router = require('../../util/router-util');
const AskLeaveService = require('../../service/client/AskLeaveService');

const OK_CODE = 0;
const API = '/client/ask-leave'

let askLeaveService = new AskLeaveService();

router.get(`${API}/getLeaveList`, (req, res) => {
  let condition = req.query.condition;
  askLeaveService.getLeaveList(condition).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
});
router.get(`${API}/getLeave`, (req, res) => {
  let id = req.query.leaveId;
  askLeaveService.getLeave(id).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
});
router.post(`${API}/addLeave`, (req, res) => {
  let leave = req.body.leaveData;
  askLeaveService.addLeave(leave).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
});
router.post(`${API}/approveLeave`, (req, res) => {
  let leave = req.body.leaveData;
  askLeaveService.approveLeave(leave).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
})
router.post(`${API}/retrialLeave`, (req, res) => {
  let leave = req.body.leaveData;
  askLeaveService.retrialLeave(leave).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  });
});
router.get(`${API}/getLeaveTypeList`, (req, res) => {
  askLeaveService.getLeaveTypeList().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});

router.get(`${API}/getLeaveType`, (req, res) => {
  let id = req.query.typeId;
  askLeaveService.getLeaveType(id).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
})

module.exports = router;