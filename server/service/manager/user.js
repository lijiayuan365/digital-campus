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
 */
function getUserList(searchType, searchId) {
  return new Promise(function (resolve, reject) {
    let sql = {};
    sql[searchType] = searchId;
    userDao.findAll(sql).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      console.log(error)
    });
  });
  // return user;
};
function getUser(userId){
  return new Promise((resolve,reject)=>{
    userDao.findOne({userId:userId})
    .then((res)=>{
      resolve(res);
    });
  });
}

/**
 *
 */
function getDept(deptId) {
  return new Promise(function (resolve, reject) {
    deptDao.findOne({ deptId: deptId })
      .then((result) => {
        let deptId = result.deptId;
        deptDao.findAll({ parentDept: deptId })
          .then((res) => {
            // console.log(res);
            result.subDept = res;
            console.log(result);
            resolve(result);
          });
      });
  }).catch((error) => {
    console.log(error);
  });
};
// 新增部门信息 
function addDept(deptInfo) {
  return new Promise((resolve,reject)=>{
    deptInfo.deptId = createId();
    deptDao.save(deptInfo)
    .then((res)=>{
      resolve(res);
    })
  })
}
// 移除部门信息
function deleteDept(deptId) {
  return new Promise((resolve, reject) => {
    deptDao.remove({ deptId: deptId })
      .then((res) => {
        resolve(res);
      });
  });
}
// 编辑部门信息
function updateDept(deptInfo) {
  return new Promise((resolve, reject) => {
    deptDao.save(deptInfo)
      .then((res) => {
        resolve(res);
      });
  });
}

// 获取组织列表
function getOrgList() {
  return new Promise((resolve, reject) => {
    orgDao.findAll()
      .then((data) => {
        resolve(data);
      });
  });
}
// 获取组织数据
function getOrg(orgId) {
  return new Promise((resolve, reject) => {
    orgDao.findOne({orgId:orgId})
      .then((res) => {
        resolve(res);
      });
  });
}
// 新增组织
function addOrg(orgInfo) {
  return new Promise((resolve, reject) => {
    orgInfo.orgId = createId();
    orgDao.save(orgInfo)
      .then((res) => {
        resolve(res);
      });
  });
}
// 移除组织信息
function deleteOrg(orgId) {
  return new Promise((resolve, reject) => {
    orgDao.remove({ orgId: orgId })
      .then((res) => {
        resolve(res);
      });
  })
}
// 更新组织信息
function updateOrg(deptInfo) {
  return new Promise((resolve, reject) => {
    orgDao.save(deptInfo)
      .then((res) => {
        resolve(res);
      });
  });

}
// 获取职位列表
function getPostList(deptId) {
  return new Promise(function (resolve, reject) {
    postDao.findAll({ 'deptId': deptId })
      .then((res) => {
        resolve(res)
      })
  })
}

module.exports = {
  getUserList,
  getUser,
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