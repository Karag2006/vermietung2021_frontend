import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import auth from './auth.module.js'
import customer from './customer.module'
import user from './user.module'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: "",
      color: ""
    },
    baseApiUrl: "http://192.168.1.21/api/",
  },
  mutations: {
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.color = payload.color
      state.snackbar.show = true
    },
    closeSnackbar(state) {
      state.snackbar.show = false
    }
  },
  actions: {
  },
  modules: {
    auth,
    navigation,
    customer,
    user
  }
})
