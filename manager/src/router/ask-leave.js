import AskLeave from '../views/ask-leave/AskLeaveIndex.vue'
import LeaveDetail from'../views/ask-leave/LeaveDetail.vue'
import AskLeaveSetting from '../views/ask-leave/AskLeaveSetting.vue'
import LeaveType from '../views/ask-leave/LeaveType.vue'
import TypeDetail from '../views/ask-leave/TypeDetail.vue'

export default [
  {
    path: 'ask-leave',
    name: 'AskLeave',
    component: AskLeave,
  },
  {
    path: 'ask-leave/detail',
    name: 'LeaveDetail',
    component: LeaveDetail,
  },
  {
    path: 'ask-leave/setting',
    name: 'AskLeaveSetting',
    component: AskLeaveSetting
  },
  {
    path: 'ask-leave/setting/type',
    name: 'LeaveType',
    component: LeaveType
  },
  {
    path: 'ask-leave/setting/type/detail',
    name: 'TypeDetail',
    component: TypeDetail,
  },
]
