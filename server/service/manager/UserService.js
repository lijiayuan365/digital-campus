const log = console.log;
const mongoose = require('mongoose');
const UserDao = require('../../dao/UserDao');
const DeptDao = require('../../dao/DeptDao');
const PostDao = require('../../dao/PostDao');
// const PostTypeDao = require('../../dao/PostTypeDao');
const OrgDao = require('../../dao/OrgDao');

let userDao = new UserDao();
let deptDao = new DeptDao();
let postDao = new PostDao();
// let postTypeDao = new PostTypeDao();
let orgDao = new OrgDao();

class UserService {
  // constructor(userDao, deptDao, postDao, postTypeDao, orgDao) {
  //   this.userDao = userDao;
  //   this.deptDao = deptDao;
  //   this.postDao = postDao;
  //   this.postTypeDao = postTypeDao;
  //   this.orgDao = orgDao;

  // }
  /**
   * 
   * @param {*} searchType 搜索类型
   * @param {*} searchId 搜索id
   * @returns promise
   */
  async  getUserList(searchType, searchId) {
    let sql = {};
    // 查询配置
    let cons = { sessionKey: 0 }
    if (searchType && searchId) {
      sql[searchType] = searchId;
    }
    try {
      let userList = await userDao.findAll(sql, cons);
      userList.forEach(user => {
        user._doc.userId = user._id;
      })
      return userList;
    } catch (error) {
      console.log(`getUserList error--> ${error}`);
      return error;
    }
  }

  async  getUser(userId) {
    try {
      let user = await userDao.findOne({ _id: userId });
      user._doc.userId = user._id;
      return user;
    } catch (error) {
      console.log(`getUser error--> ${error}`);
      return error;
    }
  }

  async importUser(users){
    try {
      let res = await userDao.saveMany(users);
      return res;
    } catch (error) {
      console.log(`importUser error--> ${error}`);
      return error;
    }
  }

  // 新增部门信息
  async  addUser(user) {
    try {
      let result = await userDao.save(user);
      return result;
    } catch (error) {
      console.log(`addDept error--> ${error}`);
      return error;
    }
  }
  async  deleteUser(userId) {
    try {
      let result = await userDao.remove({ _id: userId });
      return result;
    } catch (error) {
      console.log(`deleteUser error--> ${error}`);
      return error;
    }
  }

  async  batchDeleteUser(users) {
    try {
      let result = await userDao.remove({ _id: { $in: users } });
      return result;
    } catch (error) {
      console.log(`batchDeleteUser error--> ${error}`);
      return error;
    }
  }

  async  updateUser(user) {
    try {
      // 更新用户信息
      let result = await userDao.update({ _id: user.userId }, user);
      return result;
    } catch (error) {
      console.log(`updateUser error--> ${error}`);
      return error;
    }
  }

  recursionTree(deptList, parentDept) {
    let dept = [];
    for (let i = 0; i < deptList.length; i++) {
      let deptNode = deptList[i];
      deptNode._doc.deptId = deptNode._id;
      if (mongoose.Types.ObjectId(deptNode.parentDept).toString() == parentDept._id) {
        // debugger
        let childDept = deptNode;
        childDept._doc.childDept = this.recursionTree(deptList, deptNode);
        dept.push(childDept);
      }
    }
    return dept;
  }
  // 部门
  // 导入部门
  async importDept(depts){
    try {
      let res = await deptDao.saveMany(depts);
      return res;
    } catch (error) {
      console.log(`importUser error--> ${error}`);
      return error;
    }
  }
  async  getDeptTree() {
    // let dept = [];
    try {
      let deptList = await deptDao.findAll();
      // 获取根节点部门
      let rootDept = deptList.find((dept) => dept._doc.rootDept == true);
      rootDept._doc.deptId = rootDept._id;
      rootDept._doc.childDept = this.recursionTree(deptList, rootDept);
      return [rootDept];
    } catch (error) {
      console.log(`getDeptTree error--> ${error}`);
      return error;
    }
  }
  async  getDeptList() {
    try {
      let deptList = await deptDao.findAll();
      deptList.forEach(item => {
        item._doc.deptId = item._id;
      });
      return deptList;
    } catch (error) {
      console.log(`getDeptList error--> ${error}`);
      return error;
    }
  }

  async  checkDeptLeaf(deptId) {
    try {
      let deptData = await deptDao.findOne({ parentDept: deptId });
      if (deptData) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(`checkDeptLeaft error--> ${error}`);
      return error;
    }
  }
  async  getDept(deptId) {
    try {
      let deptData = await deptDao.findOne({ _id: deptId });
      deptData._doc.deptId = deptData._id;
      let childDept = await deptDao.findAll({ parentDept: deptData._id });
      for (let i = 0; i < childDept.length; i++) {
        childDept[i]._doc.deptId = childDept[i]._id;
        // let isLeaf = await checkDeptLeaf(childDept[i]._id);
        // childDept[i]._doc.isLeaf = isLeaf;
      }
      deptData._doc.childDept = childDept;
      return deptData;
    } catch (error) {
      console.log(`getDept error--> ${error}`);
      return error;
    }
  }

  // 新增部门信息
  async  addDept(dept) {
    try {
      let result = await deptDao.save(dept);
      return result;
    } catch (error) {
      console.log(`addDept error--> ${error}`);
      return error;
    }
  }

  // 移除部门信息
  async  deleteDept(deptId) {
    try {
      let result = await deptDao.remove({ _id: deptId });
      return result;
    } catch (error) {
      console.log(`deleteDept error--> ${error}`);
      return error;
    }
  }

  // 编辑部门信息
  async  updateDept(dept) {
    try {
      let result = await deptDao.update({ _id: dept.deptId }, dept)
      return result;
    } catch (error) {
      console.log(`updateDept error--> ${error}`);
      return error;
    }
  }

  // 获取组织列表
  async  getOrgList() {
    try {
      let orgList = await orgDao.findAll();
      orgList.forEach(item => {
        item._doc.orgId = item._id;
      });
      return orgList;
    } catch (error) {
      console.log(`getOrgList error--> ${error}`);
      return error;
    }
  }

  // 获取组织数据
  async  getOrg(orgId) {
    try {
      let org = await orgDao.findOne({ _id: orgId });
      org._doc.orgId = org._id;
      return org;
    } catch (error) {
      console.log(`getOrg error--> ${error}`);
      return error;
    }
  }

  // 新增组织
  async  addOrg(org) {
    try {
      let result = await orgDao.save(org);
      return result;
    } catch (error) {
      console.log(`addOrg error--> ${error}`);
      return error;
    }
  }

  // 移除组织信息
  async  deleteOrg(orgId) {
    try {
      let result = await orgDao.remove({ _id: orgId });
      return result;
    } catch (error) {
      console.log(`deleteOrg error--> ${error}`);
      return error;
    }
  }

  // 更新组织信息
  async  updateOrg(org) {
    try {
      let result = await orgDao.update({ _id: org.orgId }, org);
      return result;
    } catch (error) {
      console.log(`deleteOrg error--> ${error}`);
      return error;
    }
  }

  // 获取职位列表
  async  getPostList(deptId) {
    let cons = {}
    if (deptId) {
      cons = { '_id': deptId }
    }
    try {
      let postList = await postDao.findAll(cons);
      postList.forEach(post => {
        post._doc.postId = post._id;
      });
      return postList;
    } catch (error) {
      console.log(`deleteOrg error--> ${error}`);
      return error;
    }
  }
  /**
   * 
   * @param {*} post 
   */
  async  addPost(post) {
    try {
      let result = await postDao.save(post);
      return result;
    } catch (error) {
      console.log(`addOrg error--> ${error}`);
      return error;
    }
  }
  /**
   * 
   * @param {*} postId 
   */
  async  deletePost(postId) {
    try {
      let result = await postDao.remove({ _id: postId });
      return result;
    } catch (error) {
      console.log(`deleteOrg error--> ${error}`);
      return error;
    }
  }
  /**
   * 
   * @param {*} post 
   */
  async  updatePost(post) {
    try {
      let result = await postDao.update({ _id: post.postId }, post);
      return result;
    } catch (error) {
      console.log(`deleteOrg error--> ${error}`);
      return error;
    }
  }
  async  getPostTypeList() {
    try {
      // let postTypeList = await postTypeDao.findAll();
      let postTypeList = await postDao.findAll({}, { postType: 1, _id: 0 });
      let tmp = {};
      let typeList = [];
      postTypeList.forEach((item) => {
				if (!tmp[item]) {
					tmp[item] = 1;
					typeList.push(item.postType);
				}
			});
      // postTypeList = postTypeList.map((item) => item.postType);
      return typeList;
    } catch (error) {
      console.log(`getPostTypeList error--> ${error}`);
      return error;
    }
  }

}
module.exports = UserService;