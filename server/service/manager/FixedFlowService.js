const FixedFlowDao = require('../../dao/FixedFlowDao');

let fixedFlowDao = new FixedFlowDao();

class FixedFlowService {
	async getFlowList() {
		try {
			let flowList = await fixedFlowDao.findAll();
			return flowList;
		} catch (error) {
			console.log(`getFixedFlowList error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async getFlow(id) {
		try {
			let flow = await fixedFlowDao.findOne({ _id: id });
			let nodes = [];
			let p = flow.flow;
			while (p) {
				nodes.push(p.data)
				p = p.childNode
			}
			// while(flow.flow.childNode){
			// 	nodes.push(flow.flow.childNode);
			// }
			delete flow._doc.flow;
			flow._doc.nodes = nodes;
			flow._doc.flowId = flow._id;
			return flow;
		} catch (error) {
			console.log(`getFixedFlow error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} flow 
	 */
	async addFlow(flow) {
		try {
			let result = await fixedFlowDao.save(flow);
			return result;
		} catch (error) {
			console.log(`getFixedFlow error --> ${error}`);
			return error;
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async removeFlow(id) {
		try {
			let result = await fixedFlowDao.remove({ _id: id });
			return result;
		} catch (error) {
			console.log(`removeFixedFlow error --> ${error}`);
			return error;
		}
	}
	async updateFlow(flow) {
		try {
			let result = await fixedFlowDao.update({ _id: flow.flowId || flow._id }, flow);
			return result;
		} catch (error) {
			console.log(`updateFixedFlow error --> ${error}`);
			return error;
		}
	}
	async getFlowGroup() {
		try {
			let dataList = await fixedFlowDao.findAll({}, { _id: 0, flowGroup: 1 });
			let tmp = {};
			let groupList = [];
			dataList.forEach((item) => {
				if (!tmp[item]) {
					tmp[item] = 1;
					groupList.push(item.flowGroup);
				}
			});
			return groupList;
		} catch (error) {
			console.log(`getFlowGroup error --> ${error}`);
			return error;
		}
	}
}

module.exports = FixedFlowService;