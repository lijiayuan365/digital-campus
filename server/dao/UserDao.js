// const User = require('../models/user');
//
// const getUser = function () {
//   return new Promise(function (resolve, reject){
//     User.find(function (err, doc) {
//       if (err) {
//         console.log(err);
//         reject(err)
//       } else {
//         resolve(doc);
//       }
//     });
//   })
//
// };
let BaseDao = require('./BaseDao');
let User = require('../models/user');


class UserDao extends BaseDao {
  constructor() {
    super(User);
  }
}

module.exports = UserDao;