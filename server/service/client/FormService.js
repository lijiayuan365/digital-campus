const FormDao = require('../../dao/FormDao')
const FormDataDao = require('../../dao/FormDataDao')

const {
  linkFindNode,
  linkFindParentNode,
  treeFindNode,
  treeFindParentNode,
} = require('../../util/flow');

let formDao = new FormDao();
let formDataDao = new FormDataDao();


class FormService {
  /**
   * 已填单数据列表
   * @param {*} condition 
   */
  async getFormDataList(condition) {
    try {
      condition = JSON.parse(condition);
      let formDataList = []
      if (!condition.type) {
        formDataList = await formDataDao.findAll(condition);
      } else if (condition.type === 'dealPerson') {
        // 带我审批
        formDataList = await formDataDao.findAll({ status: 0 });
        formDataList = formDataList.filter((item) => {
          // console.log(item.currentNode.data.nodePersons);
          // console.log(item.currentNode.nodePersons)
          let nodePerson = item.currentNode.nodePersons;
          return nodePerson.some((person) => {
            return person._id === condition.dealPerson;
          });
        });
        // console.log(formDataList)
      } else {
        // 与我相关
        // debugger
        formDataList = await formDataDao.findAll();
        formDataList = formDataList.filter((item) => {
          return item.form.ccPerson.some((person) => {
            return person._id === condition.ccPerson;
          });
        });
      }
      let dataList = [];
      for (let i = 0; i < formDataList.length; i++) {
        let form = formDataList[i];
        let data = {};
        data.title = form.formTitle;
        // 审批状态
        let status = form.status === 0 ? '审批中' : form.status === 1 ? '已审批' : form.status === 2 ? '已结束' : form.status === 3 ? '退审中' : '已退审';
        let currentNode = '自由流程';
        if (!form.form.isFree) {
          currentNode = form.currentNode.nodeName || '';
        }
        data.desc = `${status}: ${currentNode}`;
        data.dataType = form.form.formType === 0 ? '普通单' : form.form.formType === 1 ? '审批单' : '任务单';
        // 提单日期
        // let date = new Date(form.time)
        data.date = `${form.time.getMonth() + 1}-${form.time.getDate()}`;
        data.creator = {};
        data.creator.userName = form.creator.userName;
        data.path = `detail?formDataId=${form._id}`
        data.img = form.creator.avatar;
        dataList.push(data);
      }
      // formDataList.forEach((data) => {
      //   data._doc.title = data.formTitle;
      //   data._doc.path = `detail?formDataId=${data._id}`
      //   data._doc.img = 'http://img.cdn.lijiayuan.top/zzy/form.png'
      //   data._doc.date = `${data.time.getMonth()}-${data.time.getDate()}`
      // })

      return dataList;
    } catch (error) {
      console.log(`getFormDataList error--> ${error}`);
      return error;
    }
  }
  /**
   * 表单列表
   */
  async getFormList() {
    try {
      let formList = await formDao.findAll({ status: 1 }, '_id formTitle');
      formList.forEach((form) => {
        form._doc.title = form.formTitle;
        form._doc.path = `add?formId=${form._id}`;
        form._doc.img = 'http://img.cdn.lijiayuan.top/zzy/form.png';
      });
      return formList;
    } catch (error) {
      console.log(`getFormList error--> ${error}`);
      return error;
    }
  }
  /**
   * 表单分组表
   */
  async getFormGroup() {
    try {
      let group = await formDao.findAll({ status: 1 }, 'formGroup')
      let tmp = {};
      let groups = [];
      group.forEach((item) => {
        if (!tmp[item.formGroup]) {
          tmp[item.formGroup] = 1;
          let formGroup = {
            title: item.formGroup,
            path: `group-form?groupName=${item.formGroup}`,
            img: 'http://img.cdn.lijiayuan.top/zzy/form-group.png',
          }
          groups.push(formGroup);
        }
      });
      return groups;
    } catch (error) {
      console.log(`getFormGroup error--> ${error}`);
      return error;
    }
  }
  /**
   * 新填单配置
   * @param {*} id 
   */
  async getFormConfig(id) {
    try {
      let form = await formDao.findOne({ _id: id });
      if (form.flowType === 1) {
        // 固定流程
        form.fixedFlow.forEach((flow) => {
          let pendingNode = [];
          let p = flow.flow;
          while (p != null) {
            if (p.data.nodePersonType == 1) {
              pendingNode.push(p.data);
            }
            p = p.childNode;
          }
          flow._doc.pendingNode = pendingNode;
          flow._doc.currentNode = flow.flow.data;

        });
      } else if (form.flowType === 2) {
        // 分支流程
        let flow = form.branchFlow;
        let pendingNode = [];
        treeOrder(flow, pendingNode);
        form._doc.branchFlow.pendingNode = pendingNode;
        form._doc.branchFlow.currentNode = form.branchFlow.childNode[0].data;
        // while (flow.)
      }

      let formFlow = {
        flowType: form.flowType,
        isFree: form.isFree,
        fixedFlow: form.fixedFlow,
        branchFlow: form.branchFlow
      };
      form._doc.formFlow = formFlow;

      return form;
    } catch (error) {
      console.log(`getForm error--> ${error}`);
      return error;
    }
  }
  /**
   * 新增填单数据
   * @param {*} data 
   */
  async addFormData(data) {
    try {
      let now = new Date();
      data.time = now.getTime();
      let pendingNode = data.pendingNode;
      // 自由流程
      if (data.flowType == 0) {
        data.nextNode = {
          nodeName: '下一节点',
          nodePersons: [],
        }
        data.freeFlow = [];
      }
      // 固定流程
      if (data.flowType == 1) {
        pendingNode.forEach((item) => {
          let node = linkFindNode(data.formFlow, item.nodeId)
          node.data.nodePersons = item.nodePersons;
        });
        data.currentNode = linkFindNode(data.formFlow, data.currentNode.nodeId).data;
      }
      // 分支流程
      if (data.flowType == 2) {
        pendingNode.forEach((item) => {
          let node = treeFindNode(data.formFlow, item.nodeId);
          node.data.nodePersons = item.nodePersons;
          // tree2Order(data.formFlow, item)
        });
        if (data.currentNode.nodePersonType == 1) {
          let currentNode = treeFindNode(data.formFlow, data.currentNode.nodeId);
          data.currentNode = currentNode.data;
        }
      }
      let result = await formDataDao.save(data);
      return result;
    } catch (error) {
      console.log(`addFormData error--> ${error}`);
      return error;
    }
  }
  /**
   * 获取填单数据
   * @param {*} id 
   */
  async getFormData(id) {
    try {
      let formData = await formDataDao.findOne({ _id: id });
      // 解决多选列表的值的问题
      let fieldList = formData._doc.form.fieldList;
      for (let i = 0; i < fieldList.length; i++) {
        if (fieldList[i].fieldName === 'CheckboxField') {
          let values = formData._doc.formValues;
          let checkboxs = fieldList[i].checkboxList;
          for (let j = 0; j < checkboxs.length; j++) {
            if (values[i] && values[i].includes(checkboxs[j].value)) {
              checkboxs[j].checked = true;
            }
          }
        }
      }
      // 流程运转
      formData._doc.pendingNode = [];
      if (formData.form.flowType === 0) {
        // 自由流程
        // formData._doc.currentNode = {};
        formData._doc.formFlow = {
          isFree: true,
          flowType: 0,
        }
        formData._doc.pendingNode = [formData._doc.nextNode];
      } else if (formData.form.flowType === 1) {
        // 固定流程
        let currentId = formData.currentNode.nodeId;
        let currentNode = linkFindNode(formData.formFlow, currentId);
        if (currentNode && currentNode.childNode && currentNode.childNode.data.nodePersonType == 2) {
          formData._doc.pendingNode = [currentNode.childNode.data];
        }
        let flow = formData.formFlow;
        formData._doc.formFlow = {
          isFree: false,
          flowType: 1,
          fixedFlow: flow,
        }
      } else {
        // 分支流程
        let currentNode = formData._doc.currentNode;
        let flow = formData.formFlow;
        // treeOrderApprove(formData._doc.formFlow, currentNode, formData);
        formData._doc.formFlow = {
          isFree: false,
          flowType: 2,
          branchFlow: flow,
        }
        // formData._doc.currentNode = currentNode;
      }
      return formData;
    } catch (error) {
      console.log(`getFormData error--> ${error}`);
      return error;
    }
  }



  /**
   *  审批表单
   * @param {*} data 
   */
  async approveForm(data) {
    // debugger
    try {
      let currentNode = data.currentNode;
      
      // 查看当前节点处理人的审批情况,审批完返回 true；
      let approveFlag = currentNode.nodePersons.every((item) => {
        return item.approve === 1
      });
      if (data.flowType === 0) {
        // 自由流程
        // 当前节点处理人全部通过
        // debugger
        if (approveFlag) {
          //删除节点的审批状态
          data.currentNode.nodePersons.forEach((item) => {
            // debugger
            item['approve'] = 0;
            // item['approve'] && delete item[approve];
          })
          data.freeFlow.push(data.currentNode);
          data.currentNode = data.nextNode;
          data.nextNode = { nodeName: '下一节点', nodePersons: [] };
        }
      } else if (data.flowType === 1) {
        // 固定流程
        // 当前节点确定的人处理
        data.pendingNode.forEach((item) => {
          let node = linkFindNode(data.formFlow, item.nodeId)
          node.data.nodePersons = item.nodePersons;
        });
        // 当前节点处理人全部通过
        if (approveFlag) {
          let flowCurrentNode = linkFindNode(data.formFlow, currentNode.nodeId);
          if (flowCurrentNode.childNode) {
            // 如果还有子节点的话
            data.currentNode = flowCurrentNode.childNode.data;
          } else {
            // 没有后续节点，审批完成
            data.currentNode = {};
            data.status = 2;
          }
        }
      } else {
        // 分支流程
        // 当前节点处理人全部通过
        if (approveFlag) {
          let flowCurrentNode = treeFindNode(data.formFlow, currentNode.nodeId)
          if (flowCurrentNode.childNode[0].data.nodeName === '结束节点') {
            // 没有后续节点，审批完成
            data.currentNode = {};
            data.status = 2;
          } else {
            // 如果还有子节点的话
            data.currentNode = flowCurrentNode.childNode[0].data;
          }
        }
      }
      let res = await formDataDao.update({ _id: data.formDataId }, data)
      return res;
    } catch (error) {
      console.log(`approveForm error--> ${error}`);
      return error;
    }

  }
  /**
   * 退审
   * @param {*} data 
   */
  async retrialForm(data) {
    let formDataId = data.formDataId;
    try {
      if (data.flowType === 0) {
        // 自由流程
        if (data.freeFlow.length === 0) {
          data.status = 4;
        } else {
          data.currentNode = data.freeFlow.splice(data.freeFlow.length - 1, 1)[0];
          data.nextNode = { nodeName: '下一节点', nodePersons: [] };
        }

      } else if (data.flowType === 1) {
        // 固定流程
        let parentNode = linkFindParentNode(data.formFlow, data.currentNode.nodeId);
        if (!parentNode) {
          data.status = 4;
        } else {
          data.currentNode = parentNode.data;
        }
      } else {
        // 分支流程
        let parentNode = treeFindParentNode(data.formFlow, data.currentNode.nodeId);
        if (parentNode.data.nodeName === '开始节点') {
          data.status = 4;
        } else {
          data.currentNode = parentNode.data;
        }
      }
      let res = formDataDao.update({ _id: formDataId }, data);
      return res;
    } catch (error) {
      console.log(`retrial error--> ${error}`);
      return error;
    }
  }
  /**
   * 自由流程结束流程
   * @param {*} data 
   */
  async endFlow(data) {
    try {
      let formId = data.formDataId;
      data.freeFlow.push(data.currentNode);
      data.nextNode = {};
      data.status = 2;
      let res = formDataDao.update({ _id: formId }, data)
      return res;
    } catch (error) {
      console.log(`endFlow error--> ${error}`);
      return error;
    }
  }
}


// 遍历树确定需要提单节点选定处理人的节点
function treeOrder(tree, pendingNode) {
  if (tree) {
    let data = tree.data;
    if (data.nodePersonType == 1) {
      pendingNode.push(data)
    }
    tree.childNode.forEach((item) => {
      treeOrder(item, pendingNode);
    })
  }
}
// 遍历树将提单人确定的节点给至对应节点
function tree2Order(tree, node) {
  if (tree) {
    let data = tree.data;
    if (data.nodeId === node.nodeId) {
      // 找到对应节点
      data.nodePersons = node.nodePersons
      return true;
    } else {
      tree.childNode.some((item) => {
        let flag = tree2Order(item, node);
        return flag;
      })
    }

  }
}
// 遍历树节点，查找至当前节点，返回其符合条件的子节点
function treeOrderApprove(tree, currentNode, formData) {
  if (tree) {
    if (tree.data.nodeId === currentNode.nodeId) {
      formData._doc.currentNode = tree.childNode[0].data;
      return true;
    }
    tree.childNode.some((item) => {
      let flag = treeOrderApprove(item, currentNode, formData);
      return flag;
    });
  }
}
module.exports = FormService;