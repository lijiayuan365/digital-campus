const LeaveTypeDao = require('../../dao/LeaveTypeDao');

let leaveTypeDao = new LeaveTypeDao();

class LeaveTypeService {
	async getLeaveTypeList() {
		try {
			let leaveTypeList = await leaveTypeDao.findAll();
			return leaveTypeList;
		} catch (error) {
			console.log(`getLeaveTypeList error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async getLeaveType(id) {
		try {
			let leaveType = await leaveTypeDao.findOne({ _id: id });
			leaveType._doc.leaveTypeId = leaveType._id;
			return leaveType;
		} catch (error) {
			console.log(`getLeaveType error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} leaveType 
	 */
	async addLeaveType(leaveType) {
		try {
			let result = await leaveTypeDao.save(leaveType);
			return result;
		} catch (error) {
			console.log(`getLeaveType error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async removeLeaveType(id) {
		try {
			let result = await leaveTypeDao.remove({ _id: id });
			return result;
		} catch (error) {
			console.log(`removeLeaveType error --> ${error}`);
			return error;
		}
	}
	async updateLeaveType(leaveType) {
		try {
			let result = await leaveTypeDao.update({ _id: leaveType.leaveTypeId || leaveType._id }, leaveType);
			return result;
		} catch (error) {
			console.log(`updateLeaveType error --> ${error}`);
			return error;
		}
	}
}

module.exports = LeaveTypeService;