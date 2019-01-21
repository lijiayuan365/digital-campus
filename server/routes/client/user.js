const router  = require('../../util/router-util');
const requset = require('request');
const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
// require('any-promise/register/q');
// var rp = require('request-promise-any');
const UserService = require('../../service/client/UserService');
const OK_CODE = 0;


const userService = new UserService();

const api = require('../../config/common.json').clientApi + '/user';
const appid = require('../../config/common.json').appid;
const appsecret = require('../../config/common.json').appsecret;

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("disconnect", function() {
      console.log("a user go out");
  });

  socket.on("message", function(obj) {
      //延迟3s返回信息给客户端
      setTimeout(function(){
          console.log('the websokcet message is'+obj);
          io.emit("message", obj);
      },3000);
  });
});
//开启端口监听socket
server.listen(3001);

router.get(`demo`,(req,res)=>{
  res.send(`hello client user${appid}  ${appsecret}`);
});
router.post(`wechatLogin`,(req,res)=>{ 
  let code = req.body.code;
  requset.get({
    url:`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`,
    // form:{appid:appid,secret:appsecret,js_code:code,grant_type:'authorization_code'}
  },(err,data,body)=>{
    body = JSON.parse(body);
    let sessionKey = body.session_key;
    let openid = body.openid;
    userService.wechatLogin(sessionKey,openid).then((result)=>{
      res.json({
        code:OK_CODE,
        msg:'',
        data:{userId:openid}
      })
    });
  })
});
router.get(`getAddressBook`,(req,res)=>{
  userService.getAddressBook().then((data)=>{
    res.json({
      code:OK_CODE,
      msg:'',
      data:data,
    })
  })
});
module.exports = router;