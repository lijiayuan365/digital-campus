const AskLeaveDao = require('../../dao/AskLeaveDao');

let askLeaveDao = new AskLeaveDao();

class AskLeaveService {
	async getAskLeaveList() {
		try {
			let askLeaveList = await askLeaveDao.findAll();
			return askLeaveList;
		} catch (error) {
			console.log(`getAskLeaveList error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async getAskLeave(id) {
		try {
			let askLeave = await askLeaveDao.findOne({ _id: id });
			askLeave._doc.askLeaveId = askLeave._id;
			return askLeave;
		} catch (error) {
			console.log(`getAskLeave error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} askLeave 
	 */
	async addAskLeave(askLeave) {
		try {
			let result = await askLeaveDao.save(askLeave);
			return result;
		} catch (error) {
			console.log(`getAskLeave error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async removeAskLeave(id) {
		try {
			let result = await askLeaveDao.remove({ _id: id });
			return result;
		} catch (error) {
			console.log(`removeAskLeave error --> ${error}`);
			return error;
		}
	}
	async updateAskLeave(askLeave) {
		try {
			let result = await askLeaveDao.update({ _id: askLeave.askLeaveId || askLeave._id }, askLeave);
			return result;
		} catch (error) {
			console.log(`updateAskLeave error --> ${error}`);
			return error;
		}
	}
}

module.exports = AskLeaveService;