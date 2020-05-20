import Vuex from '@wepy/x'
import {ls} from '../common/helper'

export default new Vuex.Store({
  state: {
    userInfo: null,
    bizInfo: null,
    treeData: []
  },
  mutations: {
    SET_BIZ_INFO(state, data) {
      state.bizInfo = data
      ls.set('bizInfo', data, 1)
    },
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
  getters: {
    getBizInfo: (state) => () => {
      try {
        // 第一次是在内存里
        const data = state.bizInfo || ls.get('bizInfo')
        if (!data || typeof data !== 'object') throw Error('获取用户信息失败')
        return data
      } catch (e) {
        return {}
      }
    },
    bizInfo: (state) => state.bizInfo || ls.get('bizInfo')
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
