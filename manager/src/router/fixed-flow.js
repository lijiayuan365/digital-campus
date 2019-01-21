import FixedFlow from '../views/fixed-flow/FixedFlowIndex.vue'
import FixedFlowSetting from '../views/fixed-flow/FixedFlowSetting.vue'
import FixedFlowDetail from '../views/fixed-flow/FixedFlowDetail.vue'

export default [
  {
    path: 'fixed-flow',
    name: 'FixedFlow',
    component: FixedFlow,
  },{
    path: 'fixed-flow/setting',
    name: 'FixedFlowSetting',
    component: FixedFlowSetting,
  },{
    path: 'fixed-flow/detail',
    name: 'FixedFlowDetail',
    component: FixedFlowDetail,
  }
]
