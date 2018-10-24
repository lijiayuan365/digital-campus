const router = require('../util/router-util');
// const mongoose = require('mongoose');
//
// /**
//  * 连接 mongoDB 数据库
//  */
// mongoose.connect('mongodb://localhost/campause',{useNewUrlParser:true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("mongoDB connected success");
//   // we're connected!
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 *  管理后台接口路由入口
 */
router.use('/manager',require('./manager/index'));
/**
 *  客户端接口路由入口
 */
router.use('/client',require('./client/index'));

module.exports = router;
