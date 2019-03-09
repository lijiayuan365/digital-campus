const router = require('../../util/router-util');
const requset = require('request');
const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
// require('any-promise/register/q');
// var rp = require('request-promise-any');
const UserService = require('../../service/client/UserService');
const OK_CODE = 0;
const API = '/client/user'


const userService = new UserService();

const api = require('../../config/common.json').clientApi + '/user';
const appid = require('../../config/common.json').appid;
const appsecret = require('../../config/common.json').appsecret;

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on("disconnect", function () {
    console.log("a user go out");
  });

  socket.on("message", function (obj) {
    //延迟3s返回信息给客户端
    setTimeout(function () {
      console.log('the websokcet message is' + obj);
      io.emit("message", obj);
    }, 3000);
  });
});
//开启端口监听socket
server.listen(3001);

router.get(`${API}/isSysUser`, (req, res) => {
  let code = req.query.code;
  userService.getWechatData(code)
    .then((wechatData) => {
      let session_key = wechatData.session_key;
      let openid = wechatData.openid;
      return userService.isSysUser(session_key, openid)
    })
    .then((data) => {
      res.json({
        code: OK_CODE,
        msg: '',
        data: data
      })
    })
});

router.post(`${API}/login`, (req, res) => {
  let user = req.body.user;
  userService.login(user).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result,
    });
  });
});

router.get(`${API}/getSignUpCfg`, (req, res) => {
  userService.getSignUpCfg().then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    });
  });
});
router.post(`${API}/signUp`, (req, res) => {
  let user = req.body.user;
  debugger
  userService.signUp(user).then((data) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
});
router.get(`/getAddressBook`, (req, res) => {
  let sessionId = req.session.id;
  req.session.userId = '5c43db2c27a94952c0a58652';
  userService.getAddressBook().then((data) => {
    data.sessionId = sessionId;
    res.json({
      code: OK_CODE,
      msg: '',
      data: data,
    })
  })
});
module.exports = router;