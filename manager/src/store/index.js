import Vue from 'vue'
import Vuex from 'vuex'
import SelectUser from './modules/select-user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    SelectUser
  },
})
