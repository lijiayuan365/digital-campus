const router = require('../../util/router-util');
const MeetingService = require('../../service/manager/MeetingService');
const OK_CODE = 0;
let meetingService = new MeetingService();

router.get('/getMeetingList', (req, res) => {
  meetingService.getMeetingList().then((data) => {
    res.json({
      code: OK_CODE,
      mgs: '',
      data: data,
    });
  });
});
router.get('/getMeeting', (req, res) => {
  let meetingId = req.query.meetingId;
  meetingService.getMeeting(meetingId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.post('/addMeeting', (req, res) => {
  let meeting = req.body.meetingData;
  meetingService.addMeeting(meeting).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/removeMeeting', (req, res) => {
  let meetingId = req.body.meetingId;
  meetingService.removeMeeting(meetingId).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/updateMeeting', (req, res) => {
  let meeting = req.body.meetingData
  meetingService.updateMeeting(meeting).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});

module.exports = router;