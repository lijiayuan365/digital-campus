const log = console.log;
const mongoose = require('mongoose');
const UserDao = require('../../dao/UserDao');
const DeptDao = require('../../dao/DeptDao');
const PostDao = require('../../dao/PostDao');
const PostTypeDao = require('../../dao/PostTypeDao');
const OrgDao = require('../../dao/OrgDao');

let userDao = new UserDao();
let deptDao = new DeptDao();
let postDao = new PostDao();
let postTypeDao = new PostTypeDao();
let orgDao = new OrgDao();
class UserService {
  async login() {

  }
  /**
   * 
   * @param {*} sessionKey 
   * @param {*} openid 
   */
  async wechatLogin(sessionKey, openid) {
    let user = { sessionKey, openid }
    try {
      let result = await userDao.findOne({ openid })
      if (result) {
        result = await userDao.update({ openid }, user)
      } else {
        result = await userDao.save(user);
      }
      return result;
    } catch (error) {
      console.log(`addDept error--> ${error}`);
      return error;
    }
  }
  /**
   * 获取通讯录信息
   */
  async getAddressBook() {
    try {
      let addressBook = await deptDao.findAll();
      for (let i = 0; i <  addressBook.length; i++) {
        let dept =  addressBook[i];
        let deptId = mongoose.Types.ObjectId(dept._id).toString();
        let userList = await userDao.findAll({ dept: deptId });
        dept._doc.userList = userList;
        let childDept = await deptDao.findAll({ parentDept: deptId }, { _id: 1, deptName: 1 });
        dept._doc.childDept = childDept;
        dept._doc.deptId = deptId;
        // childDept.forEach(item => {
        //   dept._doc.childDept.push(item);
        // });
        // dept._doc.childDept = childDept;
      }
      let userList = await userDao.findAll();
      return {  addressBook, userList };
    } catch (error) {
      console.log(`getAddressBook error--> ${error}`);
      return error;
    }
  }
}

module.exports = UserService;