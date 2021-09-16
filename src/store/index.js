import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import auth from './auth.module.js'
import customer from './customer.module'


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
    navigation,
    customer
  }
})
