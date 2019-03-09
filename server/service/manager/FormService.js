const FormDao = require('../../dao/FormDao');
const FixedFlowDao = require('../../dao/FixedFlowDao');

let formDao = new FormDao();
let fixedFlowDao = new FixedFlowDao();

class FormService {
  /**
   * 获取表单列表
   */
  async getFormList() {
    try {
      let formList = await formDao.findAll();
      return formList;
    } catch (error) {
      console.log(`getFormList Error --> ${error}`)
      return error;
    }
  }
  /**
   * 获取表单数据
   * @param {*} formId 
   */
  async getForm(formId) {
    try {
      let form = await formDao.findOne({ _id: formId });
      debugger
      form._doc.formId = form._id;
      form._doc.fields = form.fieldList.map(field => field.fieldName)
      return form;
    } catch (error) {
      console.log(`getForm Error --> ${error}`)
      return error;
    }
  }
  /**
   * 添加新表单
   * @param {*} formData 
   */
  async addForm(formData) {
    try {
      let result = await formDao.save(formData);
      return result;
    } catch (error) {
      console.log(`addForm Error --> ${error}`)
      return error;
    }
  }
  /**
   * 移除表单数据
   * @param {*} formId 
   */
  async removeForm(formId) {
    try {
      let result = await formDao.remove({ _id: formId });
      return result;
    } catch (error) {
      console.log(`removeForm Error --> ${error}`)
      return error;
    }
  }
  async updateForm(form) {
    try {
      let result = await formDao.update({ _id: form.formId }, form);
    } catch (error) {
      console.log(`updateForm Error --> ${error}`)
      return error;
    }
  }
  async getFixedFlows(condition) {
    try {
      // let condition = con;
      let flows = await fixedFlowDao.findAll(condition, '_id flowGroup flowName');
      debugger
      let fixedGroup = [{ groupName: flows[0].flowGroup, flow: [] }];
      flows.forEach((item) => {
        for (let i = 0; i < fixedGroup.length; i++) {
          let flowTmp = { _id: item._id, flowName: item.flowName };
          if (fixedGroup[i].groupName == item.flowGroup) {
            fixedGroup[i].flow.push(flowTmp)
            break;
          } else {
            let groupTmp = { groupName: item.flowGroup, flow: [flowTmp] };
            fixedGroup.push(groupTmp);
            break;
          }
        }
      });
      return fixedGroup;

    } catch (error) {
      console.log(`getFixedFlows Error --> ${error}`)
      return error;
    }
  }
}

module.exports = FormService;