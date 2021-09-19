import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import auth from './auth.module.js'
import customer from './customer.module'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: "",
      color: ""
    },
    baseApiUrl: "http://localhost/api/",
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
    customer
  }
})
