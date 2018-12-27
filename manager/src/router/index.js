import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import UserRoute from './user'
import ApproveRoute from './approve'
import AskLeaveRoute from './ask-leave'
import FormRoute from './form'
import MeetingRoute from './meeting'
import FixedFlowRoute from './fixed-flow'


Vue.use(Router);
let routes = [
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
      ...UserRoute,
      ...ApproveRoute,
      ...AskLeaveRoute,
      ...FormRoute,
      ...MeetingRoute,
      ...FixedFlowRoute
    ]
  }
];

let router = new Router({
  mode: 'history',
  routes: routes
});

export default router

