import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from './../views/user/index.vue'
import UserSetting from './../views/user/UserSetting.vue'
import FormFlow from './../views/form/index.vue'
import FormFlowSetting from './../views/form/FormSetting.vue'
import MoveApprove from '../views/approve/index.vue'
import MoveApproveSetting from '../views/approve/ApproveSetting.vue'
import AskLeave from '../views/ask-leave/index.vue'
import AskLeaveSetting from '../views/ask-leave/AskLeaveSetting.vue'
import MeetingAssistant from '../views/meeting/index.vue'
import MeetingSetting from '../views/meeting/MeetingSetting.vue'
import MeetingSummary from '../views/meeting/MeetingSummary.vue'
import FixedFlow from '../views/fixed-flow/index.vue'
import FixedFlowSetting from '../views/fixed-flow/FixedFlowSetting.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: 'user',
      children: [
        {
          path: '/demo',
          name: 'HelloWorld',
          component: HelloWorld,
        },
        {
          path: 'user',
          name: 'User',
          component: User,
        },
        {
          path: 'user/setting',
          name: 'UserSetting',
          component: UserSetting
        },
        {
          path: 'form-flow',
          name: 'FormFlow',
          component: FormFlow,
        },
        {
          path: 'form-flow/setting',
          name: 'FormFlowSetting',
          component: FormFlowSetting
        },
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
          path: 'meeting-assistant',
          name: 'MeetingAssistant',
          component: MeetingAssistant,
        },
        {
          path: 'meeting-assistant/summary',
          name: 'MeetingSummary',
          component: MeetingSummary
        },
        {
          path: 'meeting-assistant/setting',
          name: 'MeetingSetting',
          component: MeetingSetting
        },
        {
          path: 'fixed-flow',
          name: 'FixedFlow',
          component: FixedFlow
        },
        {
          path: 'fixed-flow/setting',
          name: 'FixedFlowSetting',
          component: FixedFlowSetting
        },
      ]
    }
  ]
})
