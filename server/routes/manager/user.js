const router = require('../../util/router-util');
const { getUserList, getUser, deleteUser, batchDeleteUser, updateUser } = require('../../service/manager/user');
const { getDept, addDept, deleteDept, updateDept } = require('../../service/manager/user');
const { getOrgList, getOrg, addOrg, deleteOrg, updateOrg } = require('../../service/manager/user');
const { getPostList} = require('../../service/manager/user');
const api = require('../../config/common.json').managerApi + '/user';

router.get(`${api}/getUserList`, function (req, res, next) {
  let searchId = req.query.id;
  let searchType = req.query.type;
  let user = [];
  getUserList(searchType, searchId)
    .then(function (result) {
      user = result;
      res.json({
        code: 0,
        msg: 'hello',
        data: user
      });
    });
});
router.get(`${api}/getUser`, (req, res, next) => {
  let userId = req.query.userId
  getUser(userId)
    .then((data) => {
      res.json({
        code: 0,
        msg: 'ok',
        data: data
      })
    });
});

router.post(`${api}/deleteUser`, (req, res)=>{
  let userId = req.body.userId;
  deleteUser(userId).then((data)=>{
    res.json({
      code: 0,
      msg: 'hello',
      data: data,
    })
  });
});
router.post(`${api}/batchDeleteUser`, (req, res)=>{
  let users = req.body.userIds;
  batchDeleteUser(users).then((data)=>{
    res.json({
      code: 0,
      msg: '',
      data: data
    })
  })
});
router.post(`${api}/updateUser`,(req,res)=>{
  let user = req.body.user;
  updateUser(user).then((data)=>{
    res.json({
      code: 0,
      msg: '',
      data: data
    })
  })
});
router.get(`${api}/getDept`, function (req, res) {
  let deptId = req.query.deptId;
  getDept(deptId)
    .then((result) => {
      let dept = result;
      // console.log(dept);
      res.json({
        code: 0,
        msg: 'hello',
        data: dept
      });
    });
});
router.post(`${api}/addDept`, (req, res) => {
  let dept = req.body.dept;
  addDept(dept)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`${api}/deleteDept`, (req, res) => {
  let deptId = req.body.deptId;
  deleteDept(deptId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.post(`${api}/updateDept`, (req, res) => {
  let dept = req.body.dept;
  updateDept(dept)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});

router.get(`${api}/getOrgList`, (req, res) => {
  getOrgList()
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
})
router.get(`${api}/getOrg`, (req, res) => {
  let orgId = req.query.orgId;
  getOrg(orgId)
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
});
router.post(`${api}/addOrg`, (req, res) => {
  let org = req.body;
  addOrg(org)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`${api}/deleteOrg`, (req, res) => {
  let orgId = req.body.orgId;
  deleteOrg(orgId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.post(`${api}/updateOrg`, (req, res) => {
  let orgId = req.body.orgId;
  updateOrg(orgId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});

router.get(`${api}/getPostList`, (req, res, next) => {
  let deptId = req.query.deptId;
  getPostList(deptId)
    .then((result) => {
      res.json({
        code: 0,
        msg: 'OK',
        data: result
      })
    });

});
module.exports = router;