const MeetingDao = require('../../dao/MeetingDao');

let meetingDao = new MeetingDao();

class MeetingService {
	async getMeetingList() {
		try {
			let meetingList = await meetingDao.findAll();
			return meetingList;
		} catch (error) {
			console.log(`getMeetingList error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async getMeeting(id) {
		try {
			let meeting = await meetingDao.findOne({ _id: id });
			meeting._doc.meetingId = meeting._id;
			return meeting;
		} catch (error) {
			console.log(`getMeeting error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} meeting 
	 */
	async addMeeting(meeting) {
		try {
			let result = await meetingDao.save(meeting);
			return result;
		} catch (error) {
			console.log(`getMeeting error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async removeMeeting(id) {
		try {
			let result = await meetingDao.remove({ _id: id });
			return result;
		} catch (error) {
			console.log(`removeMeeting error --> ${error}`);
			return error;
		}
	}
	async updateMeeting(meeting) {
		try {
			let result = await meetingDao.update({ _id: meeting.meetingId || meeting._id }, meeting);
			return result;
		} catch (error) {
			console.log(`updateMeeting error --> ${error}`);
			return error;
		}
	}
}

module.exports = MeetingService;