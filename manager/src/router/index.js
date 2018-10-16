import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from './../views/home.vue'
import User from './../components/user.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/demo',
          name: 'HelloWorld',
          component: HelloWorld,
        },
        {
          path: '/user',
          name: 'User',
          component: User,
        }
      ]
    }
  ]
})
