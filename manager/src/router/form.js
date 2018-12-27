import FormFlow from '../views/form/FormIndex.vue'
import FormDesign from '../views/form/FormDesign.vue'
import FormFlowSetting from './../views/form/FormSetting.vue'

export default [
  {
    path: 'form-flow',
    name: 'FormFlow',
    component: FormFlow,
  },
  {
    path: 'form-flow/design',
    name: 'FormDesign',
    component: FormDesign,
  },
  {
    path: 'form-flow/setting',
    name: 'FormFlowSetting',
    component: FormFlowSetting
  },
]
