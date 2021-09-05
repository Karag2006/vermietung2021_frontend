import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseApiUrl: "http://localhost/api/",
    testArray: []
  },
  mutations: {
    setTestArray(state, payload) {
      state.testArray = payload
    }
  },
  actions: {
    getTestData( {commit, state} ) {
      axios.get(state.baseApiUrl + 'user')
        .then(response => {
          commit('setTestArray', response.data)
        })
    }
  },
  modules: {
    navigation
  }
})
