import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    userInfo(state, data) {
      state.userInfo = data
    },
    decrement (state) {
      state.counter--
    }
  },
  actions: {
    setUserInfo({commit}, data) {
      commit('userInfo', data)
    },
    increment ({ commit }) {
      commit('increment')
    },
    decrement ({ commit }) {
      commit('decrement')
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
