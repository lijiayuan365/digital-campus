const UserDao = require('../../dao/user-dao');
console.log(UserDao);
let userDao = new UserDao();
const getAllUser = function () {
  return new Promise(function (resolve, reject) {
    userDao.findAll().then(function (result) {
      resolve(result);
      console.log(result);
    }).catch(function (error) {
      console.log(error)
    });
  })
  // return user;
};
module.exports = { getAllUser };