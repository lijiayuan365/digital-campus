const AskLeaveDao = require('../../dao/AskLeaveDao');
const LeaveTypeDao = require('../../dao/LeaveTypeDao');

const {
  linkFindNode,
  isApprove,
  linkFindParentNode,
} = require('../../util/flow');
let askLeaveDao = new AskLeaveDao();
let leaveTypeDao = new LeaveTypeDao();

class AskLeaveService {
  /**
   * 获取请假数据列表
   * @param {*} condition 
   */
  async getLeaveList(condition) {
    try {
      condition = JSON.parse(condition);
      let leaveList = []
      if (!condition.type) {
        leaveList = await askLeaveDao.findAll(condition);
      } else if (condition.type === 'dealPerson') {
        // 带我审批
        leaveList = await askLeaveDao.findAll({ status: 0 });
        leaveList = leaveList.filter((item) => {
          return item.currentNode.nodePersons.some((person) => {
            return person._id === condition.dealPerson;
          });
        });
      } else {
        // 与我相关
        leaveList = await askLeaveDao.findAll({ status: 0 });
        leaveList = leaveList.filter((item) => {
          return item.ccPerson.some((person) => {
            return person._id == condition.ccPerson;
          });
        });
      }
      // leaveList.forEach((item) => {

      // });
      let dataList = [];
      for (let i = 0; i < leaveList.length; i++) {
        let leave = leaveList[i];
        let data = {};
        data.title = leave.leaveTitle;
        // 审批状态
        let status = leave.status === 0 ? '审批中' : leave.status === 1 ? '已审批' : leave.status === 2 ? '已结束' : leave.status === 3 ? '退审中' : '已退审';
        let currentNode = leave.currentNode.nodeName;
        data.desc = `${status}: ${currentNode}`;
        data.dataType = '请假单';
        // 提单日期
        data.date = `${leave.createTime.getMonth() + 1}-${leave.createTime.getDate()}`;
        data.creator = {};
        data.creator.userName = leave.creator.userName;
        data.path = `detail?leaveDataId=${leave._id}`
        data.img = leave.creator.avatar;
        dataList.push(data);
      }
      return dataList;
    } catch (error) {
      console.log(`getLeaveList error ${error}`)
      return error;
    }
  }
  /**
   * 获取请假信息
   * @param {*} leaveId 
   */
  async getLeave(leaveId) {
    try {
      let data = await askLeaveDao.findOne({ _id: leaveId });
      let flow = data.flow;
      data._doc.flow = {
        isFree: false,
        flowType: 1,
        flow: flow,
      }
      //
      data._doc.pendingNode = [];
      let node = linkFindNode(flow, data.currentNode.nodeId);
      if (node && node.childNode && node.childNode.data.nodePersonType == 2) {
        data._doc.pendingNode = [node.childNode.data];
      }
      // let pengdingNode = [];
      // data._doc.pendingNode =pendingNode;
      return data;
    } catch (error) {
      console.log(`getLeave error --> ${error}`);
      return error;
    }
  }
  /**
   * 新增请假信息
   * @param {*} leave 
   */
  async addLeave(leave) {
    try {
      leave.createTime = new Date();
      leave.approvalRecords = [];
      let pendingNode = leave.pendingNode;
      pendingNode.forEach((item) => {
        let node = linkFindNode(leave.flow, item.nodeId);
        node.nodePersons = item.nodePersons;
      });
      let res = await askLeaveDao.save(leave);
      return res;
    } catch (error) {
      console.log(`addLeave error --> ${error}`);
      return error;
    }
  }

  /**
   * 获取请假类型列表
   */
  async getLeaveTypeList() {
    try {
      let data = await leaveTypeDao.findAll();
      let list = [];
      data.forEach((item) => {
        let type = {
          title: item.typeName,
          id: item._id
        };
        list.push(type);
      });
      return list;
    } catch (error) {
      console.log(`getLeaveTypeList error ${error}`)
      return error;
    }
  }
  /**
   * 获取请假类型数据
   * @param {*} id 
   */
  async getLeaveType(id) {
    try {
      let data = await leaveTypeDao.findOne({ _id: id });
      let fixedFlow = data.flow;
      let currentNode = fixedFlow.flow.data;
      let pendingNode = [];
      let p = fixedFlow.flow;
      while (p != null) {
        if (p.data.nodePersonType == 1) {
          pendingNode.push(p.data);
        }
        p = p.childNode;
      }
      data._doc.flow = {
        isFree: false,
        flowType: 1,
        currentNode: currentNode,
        pendingNode: pendingNode,
        fixedFlow: fixedFlow,
      }
      return data;
    } catch (error) {
      console.log(`getLeaveType error ${error}`)
      return error;
    }
  }
  /**
   * 审批请假流程
   * @param {*} leave 
   */
  async approveLeave(leave) {
    try {
      let currentNode = leave.currentNode;
      let flag = isApprove(currentNode);
      let node = linkFindNode(leave.flow, currentNode.nodeId);
      // 当前节点审批完成
      if (flag) {
        if (node.childNode) {
          // 还有子节点，流转
          leave.currentNode = node.childNode.data;
        } else {
          // 没有子节点，流程结束，请假成功
          leave.status = 1;
          leave.currentNode.nodeName = '批假'
        }
      }
      if (leave.pendingNode.length > 0) {
        leave.currentNode.nodePersons = pendingNode[0].nodePersons;
      }
      let result = await askLeaveDao.update({ _id: leave.leaveId }, leave);
      return result;
    } catch (error) {
      console.log(`approveLeave error --> ${error}`);
      return error;
    }
  }
  async retrialLeave(data) {
    try {
      let currentNode = data.currentNode;
      let parentNode = linkFindParentNode(data.flow, currentNode.nodeId);
      if (!parentNode) {
        data.status = 2;
        data.currentNode.nodeName = '驳回';
      } else {
        data.currentNode = parentNode.data;
      }
      let result = await askLeaveDao.update({ _id: data.leaveId }, data);
      return result;
    } catch (error) {
      console.log(`retrialLeave error --> ${error}`);
      return error;
    }
  }
}

module.exports = AskLeaveService;