const router = require('../../util/router-util');
const {getAllUser} = require('../../service/manager/user');
const api = require('../../config/common.json').managerApi+'/user';
console.log(api);

router.get(`${api}/getUser`,function (req, res, next) {
  // let userRes;
  let user = [];
  getAllUser().then(function (result) {
    user = result;
    res.json({
      code:0,
      msg:'hello',
      result:user
    });
  });

});

module.exports = router;