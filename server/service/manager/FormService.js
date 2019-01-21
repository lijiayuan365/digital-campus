const FormDao = require('../../dao/FormDao');

let formDao = new FormDao();

class FormService {
  /**
   * 获取表单列表
   */
  async getFormList() {
    try {
      let formList = await formDao.findAll();
      formList.forEach((form) => {
        debugger
        // formType 0 普通， 1 审批， 2 任务
        switch (form.formType) {
          case '0':
            form._doc.type = '普通单';
            break;
          case '1':
            form._doc.type = '审批单';
            break;
          case '2':
            form._doc.type = '任务单';
            break;
        }
      });
      debugger
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
      debugger
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
      let result = await formDao.update({ _id: form._id }, form);
    } catch (error) {
      console.log(`updateForm Error --> ${error}`)
      return error;
    }
  }
}

module.exports = FormService;