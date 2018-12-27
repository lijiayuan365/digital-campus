import User from '../views/user/UserIndex.vue'
import UserSetting from './../views/user/UserSetting.vue'
import UserDetail from '../views/user/UserDetail.vue'
import PostList from '../views/user/PostList.vue'
import OrgDetail from '../views/user/OrgDetail'
import DeptDetail from './../views/user/DeptDetail.vue'

const userRoutes = [
  {
    path: 'user',
    name: 'User',
    component: User,
  },  {
    path: 'user/detail',
    name: 'UserDetail',
    component: UserDetail
  },{
    path: 'user/setting',
    name: 'UserSetting',
    component: UserSetting
  }, {
    path: 'user/dept-detail',
    name: 'DeptDetail',
    component: DeptDetail
  },{
    path: 'user/org-detail',
    name: 'OrgDetail',
    component: OrgDetail
  },  {
    path: 'user/post',
    name: 'PostSetting',
    component: PostList
  },
];

export default userRoutes
