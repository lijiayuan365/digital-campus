const router = require('../../util/router-util');
// const { getUserList, getUser, deleteUser, batchDeleteUser, updateUser } = require('../../service/manager/user');
// const { getDeptList, getDeptTree, getDept, addDept, deleteDept, updateDept } = require('../../service/manager/user');
// const { getOrgList, getOrg, addOrg, deleteOrg, updateOrg } = require('../../service/manager/user');
// const { getPostList, getPostTypeList, addPost, deletePost, updatePost } = require('../../service/manager/user');
const UserService = require('../../service/manager/UserService')

const userService = new UserService();

const api = require('../../config/common.json').managerApi + '/user';
const API = '/manager/user';
const OK_CODE = 0;

router.get(`/getUserList`, function (req, res, next) {
  let searchId = req.query.id;
  let searchType = req.query.type;
  let user = [];
  userService.getUserList(searchType, searchId)
    .then(function (result) {
      user = result;
      res.json({
        code: 0,
        msg: 'hello',
        data: user
      });
    })
    .catch((error) => {

    });
});
router.get(`/getUser`, (req, res, next) => {
  let userId = req.query.userId
  userService.getUser(userId).then((data) => {
    res.json({
      code: 0,
      msg: 'ok',
      data: data
    })
  });
});
router.post(`/addUser`, (req, res) => {
  let user = req.body.user;
  userService.addUser(user)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`${API}/importUser`, (req, res) => {
  let users = req.body.users;
  userService.importUser(users).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result
    })
  })
});
router.post(`/deleteUser`, (req, res) => {
  let userId = req.body.userId;
  userService.deleteUser(userId)
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data,
      })
    })
    .catch((error) => {
      res.json({
        code: error.code,
        msg: '',
        data: ''
      })
    });
});
router.post(`/batchDeleteUser`, (req, res) => {
  let users = req.body.userIds;
  userService.batchDeleteUser(users).then((data) => {
    res.json({
      code: 0,
      msg: '',
      data: data
    })
  })
});
router.post(`/updateUser`, (req, res) => {
  let user = req.body.user;
  userService.updateUser(user).then((data) => {
    res.json({
      code: 0,
      msg: '',
      data: data
    })
  })
})
router.post(`${API}/importDept`, (req, res) => {
  let depts = req.body.depts;
  userService.importDept(depts).then((result) => {
    res.json({
      code: OK_CODE,
      msg: '',
      data: result
    })
  })
});
router.get(`/getDeptList`, (req, res) => {
  userService.getDeptList()
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
})
router.get(`/getDeptTree`, (req, res) => {
  userService.getDeptTree()
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
})
router.get(`/getDept`, function (req, res) {
  let deptId = req.query.deptId;
  userService.getDept(deptId)
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
router.post(`/addDept`, (req, res) => {
  let dept = req.body.dept;
  userService.addDept(dept)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`/removeDept`, (req, res) => {
  let deptId = req.body.deptId;
  userService.deleteDept(deptId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.post(`/updateDept`, (req, res) => {
  let dept = req.body.dept;
  userService.updateDept(dept)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});

router.get(`/getOrgList`, (req, res) => {
  userService.getOrgList()
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
})
router.get(`/getOrg`, (req, res) => {
  let orgId = req.query.orgId;
  userService.getOrg(orgId)
    .then((data) => {
      res.json({
        code: 0,
        msg: 'hello',
        data: data
      });
    });
});
router.post(`/addOrg`, (req, res) => {
  let org = req.body.org;
  userService.addOrg(org)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`/removeOrg`, (req, res) => {
  let orgId = req.body.orgId;
  userService.deleteOrg(orgId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.post(`/updateOrg`, (req, res) => {
  let org = req.body.org;
  userService.updateOrg(org)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});

router.get(`/getPostList`, (req, res, next) => {
  let deptId = req.query.deptId;
  userService.getPostList(deptId)
    .then((result) => {
      res.json({
        code: 0,
        msg: 'OK',
        data: result
      })
    });
});
router.post(`/addPost`, (req, res) => {
  let org = req.body;
  userService.addPost(org)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    });
});
router.post(`/deletePost`, (req, res) => {
  let postId = req.body.postId;
  userService.deletePost(postId)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.post(`/updatePost`, (req, res) => {
  let post = req.body;
  userService.updatePost(post)
    .then((data) => {
      res.json({
        code: 0,
        msg: '',
        data: data
      })
    })
});
router.get(`/getPostTypeList`, (req, res) => {
  userService.getPostTypeList()
    .then((result) => {
      res.json({
        code: 0,
        msg: 'OK',
        data: result
      })
    })
})
module.exports = router;