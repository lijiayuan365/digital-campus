const router = require('../../util/router-util');
let qr = require('qr-image');
const MeetingService = require('../../service/client/MeetingService');

const OK_CODE = 0;
const API = '/client/meeting';
let meetingService = new MeetingService();
router.get(`${API}/getMeetingList`, (req, res) => {
  let type = req.query.type;
  let condition = {};
  // let userId = req.session.userId;
  let userId = req.query.userId;
  if (type == 0) {
    // 我发布的
    condition = { creator: userId }
  } else if (type == 1) {
    // 我相关的
    condition = { originator: { $elemMatch: { $eq: userId } } }
  } else {
    // 待进行会议
    condition = { participant: { $elemMatch: { $eq: userId } } }
  }
  meetingService.getMeetinList(condition).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  });
});
router.get(`${API}/getMeeting`, (req, res) => {
  let id = req.query.meetingId;
  meetingService.getMeeting(id).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  });
});

router.post(`${API}/addMeeting`, (req, res) => {
  let data = req.body.meeting;
  data.createTime = req.body.timestamp;
  // data.creator = req.session.userId;
  data.creator = req.body.userId;
  meetingService.addMeeting(data).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
});
router.post(`${API}/updateMeeting`, (req, res) => {
  let meeting = req.body.meeting;
  meetingService.updateMeeting(meeting).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
});
router.post(`${API}/updateMeetingRecord`, (req, res) => {
  let meeting = req.body.meeting;
  meetingService.updateMeetingRecord(meeting).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
})
// router.get(`${API}/createQrcode`, (req, res) => {
//   let id = req.query.meetingId;
//   try {
//     let img = qr.image(id, { size: 10 });
//     // res.json({
//     //   code: OK_CODE,
//     //   data:img
//     // })
//     // debugger
//     res.writeHead(200, {'Content-Type': 'image/png'});
//     img.pipe(res);

//   } catch (error) {
//     console.log(`createQrcode error --> ${error}`)
//   }
// });
router.get(`${API}/createQrcode`, (req, res) => {
  let id = req.query.meetingId;
  try {
    let img = qr.imageSync(id, {size:10 });
    let data = `data:image/png;base64,${new Buffer(img).toString('base64')}`;
    res.json({
      code: OK_CODE,
      data:data
    })
  } catch (error) {
    console.log(`createQrcode error --> ${error}`)
  }
});

module.exports = router;