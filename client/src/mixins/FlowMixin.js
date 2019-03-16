import wepy from 'wepy';

export default class Example extends wepy.mixin {

  data = {
    ccPerson: [],
    currentNode: {},
    pendingNode: [], // 待当前节点决定的节点
    flow: {},
    fixedFlows: [],
    flowData: {}, // 存到表单数据里面的流程信息
    status: 0,  // 审批状态
    approvalRecords: [], // 审批记录
  };

  components = {};

  methods = {
    pickedPerson() {
      this.$invoke('flow', 'pendingNodePerson');
    },
    async approveMenu() {
      let res = await wepy.showActionSheet({
        itemList: this.operaItem
      });
      if (!res.cancel) {
        console.log(res.tapIndex);
        let index = res.tapIndex;
        // 自由流程
//          if (this.flowType === 0) {
        if (index === 0) {
          this.approve();
        } else if (index === 1) {
          this.retrial();
        } else if (index === 2) {
          this.endFlow();
        }
      }
    }
  };

  events = {
    // 获取需要当前节点确定处理人的节点
    getPendingNode(nodes) {
      this.pendingNode = nodes;

    },
    // 选定后面节点处理人后提交表单
    confirmPending() {
      this.confirmForm();
    },

  };

  watch = {};

  computed = {
    operaItem() {
      if (this.flowType === 0) {
        return ['审批', '退审', '审批并结束'];
      } else {
        return ['审批', '退审'];
      }
    }
  };

  onLoad() {
  };

  onShow() {
  };

  getFlowData() {
    let flowData = this.$invoke('flow', 'exportFlow');
    return flowData;
  }

  // 导入流程
  importAddFlow(data) {
    this.ccPerson = data.ccPerson;
    this.flow = data.flow;
    this.currentNode = this.flow.currentNode;
    this.pendingNode = this.flow.pendingNode;
    this.$invoke('flow', 'getProp', {
      currentNode: this.currentNode,
      pendingNode: this.pendingNode,
      defaultFlow: true,
      flow: this.flow,
    });
  }

  importDetailFlow(data) {
    this.flowType = data.flow.flowType;
    this.status = data.status;
    this.freeFlow = data.freeFlow;
    this.ccPerson = data.ccPerson;
    this.currentNode = data.currentNode;
    this.pendingNode = data.pendingNode;
    this.approvalRecords = data.approvalRecords;
//        let formFlow = this.flowType === 0 ? formData.formFlow : this.flowType === 1 ? formData.formFlow.fixedFlow : formData.formFlow.branchFlow;
    // 未审批完的表单走流程
    this.$invoke('flow', 'getProp', {
      currentNode: this.currentNode,
      pendingNode: this.pendingNode,
      pageType: 'detail',
      flow: data.flow,
    });
  }

  /*
    * 审批
    * */
  approve() {
    console.log('shenpi');
    // 当前处理人审批通过
    this.currentNode.nodePersons[0].approve = 1;
    this.approvalRecords.push(this.currentNode.nodePersons[0]);
    // 分流程情况
    if (this.flowType === 0) {
      // 自由流程
      this.$invoke('flow', 'pendingNodePerson');
    } else {
      // 固定流程 与 分支流程
      // 需要选择下一节点的情况
      if (this.pendingNode.length !== 0) {
        this.$invoke('flow', 'pendingNodePerson');
      } else {
        this.approveForm();
      }
    }
  }

}
