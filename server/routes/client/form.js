const router = require('../../util/router-util');
const FormService = require('../../service/client/FormService');
const OK_CODE = 0;
const API = '/client/form';

let formService = new FormService();

router.get(`${API}/getFormDataList`, (req, res) => {
  let condition = req.query.condition;
  formService.getFormDataList(condition).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
})

router.get(`${API}/getFormList`, (req, res) => {
  formService.getFormList().then((data) => {
    res.json({
      code: OK_CODE,
      msg: 'ok66',
      data: data,
    });
  });
});

router.get(`${API}/getFormGroup`, (req, res) => {
  formService.getFormGroup().then((data) => {
    res.json({
      code: OK_CODE,
      msg: 'ok',
      data: data,
    })
  });
});
router.get(`${API}/getFormConfig`, (req, res) => {
  let id = req.session.userId;
  let formId = req.query.formId;
  formService.getFormConfig(formId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: 'ok',
      data: data,
    });
  });
});

router.post(`${API}/addFormData`, (req, res) => {
  let formData = req.body.formData;
  formService.addFormData(formData).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  });
});

router.get(`${API}/getFormDetail`, (req, res) => {
  let formId = req.query.formId;
  formService.getFormData(formId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  })
})

router.post(`${API}/approveForm`, (req, res) => {
  let formData = req.body.formData;
  // debugger
  formService.approveForm(formData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  })
})
router.post(`${API}/retrialForm`, (req, res) => {
  let formData = req.body.formData;
  formService.retrialForm(formData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
})
router.post(`${API}/endFlow`, (req, res) => {
  let formData = req.body.formData;
  formService.endFlow(formData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    })
  })
})
module.exports = router;