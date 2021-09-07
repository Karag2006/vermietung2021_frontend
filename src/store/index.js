import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import auth from './auth.module.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseApiUrl: "http://localhost/api/",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    navigation
  }
})
