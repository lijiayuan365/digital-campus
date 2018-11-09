const UserDao = require('../../dao/UserDao');
const DeptDao = require('../../dao/DeptDao');
const PostDao = require('../../dao/PostDao');
const OrgDao = require('../../dao/OrgDao');
let userDao = new UserDao();
let deptDao = new DeptDao();
let postDao = new PostDao();
let orgDao = new OrgDao();

const createId = require('../../util/create-id');

/**
 * 
 * @param {*} searchType 搜索类型
 * @param {*} searchId 搜索id
 * @returns promise
 */
async function getUserList(searchType, searchId) {
  let sql = {};
  if (searchType && searchId) {
    sql[searchType] = searchId;
  }
  try {
    let userList = await userDao.findAll(sql);
    return userList;
  } catch (error) {
    console.log(`getUserList error--> ${error}`);
    return error;
  }
}

async function getUser(userId) {
  try {
    let user = await userDao.findOne({ userId: userId });
    return user;
  } catch (error) {
    console.log(`getUser error--> ${error}`);
    return error;
  }
}

async function deleteUser(userId) {
  try {
    let result = await userDao.remove({ userId: userId });
    return result;
  } catch (error) {
    console.log(`deleteUser error--> ${error}`);
    return error;
  }
}

async function batchDeleteUser(users) {
  try {
    let result = await userDao.remove({ userId: { $in: users } });
    return result;
  } catch (error) {
    console.log(`batchDeleteUser error--> ${error}`);
    return error;
  }
}

async function updateUser(user) {
  try {
    let result = await userDao.update({ userId: user.userId }, user);
    return result;
  } catch (error) {
    console.log(`updateUser error--> ${error}`);
    return error;
  }
}

/**
 * 查询部门信息
 */
/* promise 方式
function getDept(deptId) {
  return new Promise((resolve, reject) => {
    let deptData = {}
    deptDao.findOne({ deptId: deptId })
      .then((result) => {
        deptData = result;
        let fn = deptDao.findAll({ parentDept: result.deptId });
        return fn;
      })
      .then((res) => {
        debugger
        let data = res;
        res.forEach((item) => {
          item._doc.isLeaf = item.subDept.length === 0 ? true : false;
        });
        // debugger
        deptData._doc['childDept'] = res;
        resolve(deptData);
      })
      .catch((error) => {
        console.log(error);
      });
  })
}
*/
async function getDept(deptId) {
  try {
    let deptData = await deptDao.findOne({ deptId: deptId });
    let childDept = await deptDao.findAll({ parentDept: deptData.deptId });
    childDept.forEach((dept) => {
      dept._doc.isLeaf = dept.subDept.length === 0 ? true : false;
    });
    deptData._doc.childDept = childDept;
    return deptData;
  } catch (error) {
    console.log(`getDept error--> ${error}`);
    return error;
  }
}

// 新增部门信息
async function addDept(deptInfo) {
  try {
    let result = await deptDao.save(deptInfo);
    return result;
  } catch (error) {
    console.log(`addDept error--> ${error}`);
    return error;
  }
}

// 移除部门信息
async function deleteDept(deptId) {
  try {
    let result = await deptDao.remove({ deptId: deptId });
    return result;
  } catch (error) {
    console.log(`deleteDept error--> ${error}`);
    return error;
  }
}

// 编辑部门信息
async function updateDept(deptInfo) {
  try {
    let result = await deptDao.update({ deptId: deptInfo.deptId }, deptInfo)
    return result;
  } catch (error) {
    console.log(`updateDept error--> ${error}`);
    return error;
  }
}

// 获取组织列表
async function getOrgList() {
  try {
    let orgList = await orgDao.findAll();
    return orgList;
  } catch (error) {
    console.log(`getOrgList error--> ${error}`);
    return error;
  }
}

// 获取组织数据
async function getOrg(orgId) {
  try {
    let org = await orgDao.findOne({ orgId: orgId });
    return org;
  } catch (error) {
    console.log(`getOrg error--> ${error}`);
    return error;
  }
}

// 新增组织
async function addOrg(orgInfo) {
  try {
    let result = await orgDao.save(orgInfo);
    return result;
  } catch (error) {
    console.log(`addOrg error--> ${error}`);
    return error;
  }
}

// 移除组织信息
async function deleteOrg(orgId) {
  try {
    let result = await orgDao.remove({ orgId: orgId });
    return result;
  } catch (error) {
    console.log(`deleteOrg error--> ${error}`);
    return error;
  }
}

// 更新组织信息
async function updateOrg(org) {
  try {
    let result = await orgDao.save(org);
    return result;
  } catch (error) {
    console.log(`deleteOrg error--> ${error}`);
    return error;
  }
}

// 获取职位列表
async function getPostList(deptId) {
  let cons = {}
  if (deptId) {
    cons = { 'deptId': deptId }
  }
  try {
    let postList = await postDao.findAll(cons);
    return postList;
  } catch (error) {
    console.log(`deleteOrg error--> ${error}`);
    return error;
  }
}

module.exports = {
  getUserList,
  getUser,
  deleteUser,
  batchDeleteUser,
  updateUser,
  getDept,
  addDept,
  deleteDept,
  updateDept,
  getOrgList,
  getOrg,
  addOrg,
  deleteOrg,
  updateOrg,
  getPostList,
};