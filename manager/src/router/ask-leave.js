import AskLeave from '../views/ask-leave/AskLeaveIndex.vue'
import AskLeaveSetting from '../views/ask-leave/AskLeaveSetting.vue'
import LeaveType from '../views/ask-leave/LeaveType.vue'

export default [
  {
    path: 'ask-leave',
    name: 'AskLeave',
    component: AskLeave,
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
]
