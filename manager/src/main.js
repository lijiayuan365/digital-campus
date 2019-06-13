// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
import axios from './axios'
import socketio from 'socket.io-client'
import vueSocket from 'vue-socket.io'
import dataBae from './dataBase'
import store from './store/index'
import './assets/js/common'

window.dataBase = dataBae;
Vue.prototype.$http = axios;
// Vue.prototype.$http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(vueSocket,socketio('ws://127.0.0.1:8000'));/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
