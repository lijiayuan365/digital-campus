const express = require('express');
const router = express.Router();
// import {managerApi as api} from '../config'

router.get('/', function (req, res, next) {
  res.send('hello manager')
});
router.use('/user', require('./user'));
router.use('/form', require('./form'));

module.exports = router;