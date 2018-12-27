import MoveApprove from '../views/approve/ApproveIndex.vue'
import MoveApproveSetting from '../views/approve/ApproveSetting.vue'

export default [
  {
    path: 'move-approve',
    name: 'MoveApprove',
    component: MoveApprove,
  },
  {
    path: 'move-approve/setting',
    name: 'MoveApproveSetting',
    component: MoveApproveSetting
  },
]
