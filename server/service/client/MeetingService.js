const MeetingDao = require('../../dao/MeetingDao');
const MeetingRecordDao = require('../../dao/MeetingRecordDao');
const { DateForMat } = require('../../util/format');

let meetingDao = new MeetingDao();
let meetingRecordDao = new MeetingRecordDao();
class MeetingService {
  /**
   * 获取会议列表
   * @param {*} con 
   */
  async getMeetinList(con) {
    try {
      let res = await meetingDao.findAll(con);
      let list = [];
      res.forEach(item => {
        let status = item.status === 0 ? '草稿' : item.status === 1 ? '待开始' : '已结束';
        let start = new Date(item.startTime);
        let end = new Date(item.endTime);
        let meeting = {
          title: item.title,
          desc: `状态: ${status}`,
          path: `detail?meetingId=${item._id}`,
          data: [
            DateForMat(start, 'yyyy-MM-dd'),
            `${DateForMat(start, 'hh:mm')}~${DateForMat(end, 'hh:mm')}`,
            item.meetingRoom
          ]
        }
        list.push(meeting);
      });
      return list;
    } catch (error) {
      console.log(`getMeetingList error --> ${error}`);
      return error;
    }
  }

  async getMeeting(id) {
    try {
      let data = await meetingDao.findOne({ _id: id });
      let recordData = await meetingRecordDao.findOne({ meeting: id });
      let crtTime = DateForMat(new Date(data.createTime), 'yyyy-MM-dd hh:mm');
      let startTime = DateForMat(new Date(data.startTime), 'yyyy-MM-dd hh:mm');
      let endTime = DateForMat(new Date(data.endTime), 'yyyy-MM-dd hh:mm');
      let creator = data.creator.userName;
      let reply = [...recordData.attender, ...recordData.leaver];
      let noReply = [...data.participant].filter(item => {
        return ![...reply.map(user => user.id)].includes(item.id)
      });
      // 会议记录里面的数据
      data._doc.createData = `${crtTime}  ${creator}`;
      data._doc.startTime = startTime;
      data._doc.endTime = endTime;
      data._doc.leaver = recordData.leaver;
      data._doc.attender = recordData.attender;
      data._doc.noReply = noReply;
      data._doc.sign = [...recordData.sign];
      data._doc.unSign = [...recordData.unSign];
      data._doc.signRecord = [...recordData.signRecord];
      if (data.status !== 2 && new Date().getTime() > new Date(data.endTime).getTime()) {
        data._doc.status = 2;
        await meetingDao.update({ _id: data._id }, { status: 2 })
      }
      return data;
    } catch (error) {
      console.log(`getMeeting error --> ${error}`);
      return error;
    }
  }

  async addMeeting(meeting) {
    try {
      let res = await meetingDao.save(meeting);
      let record = {
        meeting: res._id,
        unSign: meeting.participant,
      }
      await meetingRecordDao.save(record);
      return res;
    } catch (error) {
      console.log(`addMeeting error --> ${error}`);
      return error;
    }
  }

  async removeMeeting(id) {
    try {

    } catch (error) {
      console.log(`removeMeeting error --> ${error}`);
      return error;
    }
  }
  /**
   * 更新会议（参加会议 会议请假 会议签到 取消签到）
   * @param {*} meeting 
   */
  async updateMeeting(meeting) {
    try {
      let res = await meetingDao.update({ _id: meeting.id }, meeting);
      return res;
    } catch (error) {
      console.log(`updateMeeting error --> ${error}`);
      return error;
    }
  }

  async updateMeetingRecord(meeting) {
    try {
      let res = await meetingRecordDao.update({ meeting: meeting.meeting }, meeting);
      return res;

    } catch (error) {
      console.log(`attendMeeting error --> ${error}`);
      return error;
    }
  }
}

module.exports = MeetingService;