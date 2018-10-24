const express = require('express');
const router = express.Router();
// import {managerApi as api} from '../config'

router.get('/', function (req, res, next) {
  res.send('hello manager')
});
router.use('/getUser', require('./user'));

module.exports = router;