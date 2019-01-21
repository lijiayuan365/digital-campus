const router = require('../../util/router-util');
const FormService = require('../../service/manager/FormService')

const OK_CODE = 0;
let formService = new FormService();

router.get('/demo', function (req, res, next) {
  res.send('hello manager')
});
router.get('/getFormList', (req, res) => {
  formService.getFormList().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.get('/getForm', (req, res) => {
  let formId = req.query.formId;
  debugger
  formService.getForm(formId).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data:data,
    });
  });
});
router.post('/addForm', (req, res) => {
  let formData = req.body.formData;
  debugger
  formService.addForm(formData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('/removeForm', (req, res) => {
  let formId = req.body.formId;
  formService.removeForm(formId).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
router.post('updateForm', (req, res) => {
  let formData = req.body.formData
  formService.updateForm(formData).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});
module.exports = router;