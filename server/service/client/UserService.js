const log = console.log;
const mongoose = require('mongoose');
const requset = require('request');
var rp = require('request-promise');
const UserDao = require('../../dao/UserDao');
const DeptDao = require('../../dao/DeptDao');
const PostDao = require('../../dao/PostDao');
const OrgDao = require('../../dao/OrgDao');

let userDao = new UserDao();
let deptDao = new DeptDao();
let postDao = new PostDao();
let orgDao = new OrgDao();
const appid = require('../../config/common.json').appid;
const appsecret = require('../../config/common.json').appsecret;
class UserService {
  // async login() {

  // }

  async getWechatData(code) {
    let res = await rp.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`);
    return JSON.parse(res);
  }
  /**
   * 
   * @param {*} sessionKey 
   * @param {*} openid 
   */
  async isSysUser(session_key, openid) {
    let user = { session_key, openid }
    try {
      let tmp = await userDao.findOne({ openid })
      if (tmp) {
        let result = await userDao.update({ openid }, user)
        return { isUser: true, session_key: session_key, openid: openid,userId:tmp._id }
      } else {
        return { isUser: false, session_key: session_key, openid: openid,}
      }
    } catch (error) {
      console.log(`addDept error--> ${error}`);
      return error;
    }
  }
  /**
   * 登录
   * @param {*} user 
   */
  async login(user) {
    // let openid = user.openid;
    try {
      let result = await userDao.update({ tel: user.tel, pwd: user.pwd }, { avatar: user.avatar, openid: user.openid, session_key: user.session_key })
      // if(result.nModified)
      return result.nModified === 1;

    } catch (error) {
      console.log(`login error--> ${error}`);
      return error;
    }
  }
  async signUp(user) {
    try {
      let result = await userDao.save(user);
      return result;
    } catch (error) {
      console.log(`signUp error--> ${error}`);
      return error;
    }
  }
  async getSignUpCfg() {
    let deptList = await deptDao.findAll({}, '_id deptName');
    let postList = await postDao.findAll({}, '_id postName');
    let orgList = await orgDao.findAll({}, '_id orgName');
    let cfg = {
      orgList: orgList,
      deptList: deptList,
      postList: postList,
    }
    return cfg;
  }

  /**
   * 获取通讯录信息
   */
  async getAddressBook() {
    try {
      let addressBook = await deptDao.findAll();
      for (let i = 0; i < addressBook.length; i++) {
        let dept = addressBook[i];
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
      return { addressBook, userList };
    } catch (error) {
      console.log(`getAddressBook error--> ${error}`);
      return error;
    }
  }
}

module.exports = UserService;