const express = require('express');
const router = express.Router();
// import {managerApi as api} from '../config'

router.get('/', function (req, res, next) {
  res.send('hello client')
});
router.use('/user', require('./user'));
router.use('/form', require('./form'));
router.use('/ask-leave',require('./ask-leave'));
router.use('/meeting',require('./meeting'));
router.use('/common', require('./common'));
module.exports = router;