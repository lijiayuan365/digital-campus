import AskLeave from '../views/ask-leave/AskLeaveIndex.vue'
import AskLeaveSetting from '../views/ask-leave/AskLeaveSetting.vue'

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
]
