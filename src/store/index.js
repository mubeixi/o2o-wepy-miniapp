import Vuex from '@wepy/x'

import { ls, objTranslate } from '@/common/helper'
import { initInfo } from '@/api/system'

export default new Vuex.Store({
  state: {
    tabbarCurrentIndex: 0,
    tabTags: [0, 0, 0, 0, 0, 0],
    userInfo: null,
    bizInfo: null,
    treeData: [],
    productImgList: [],
    initInfo: null
  },
  mutations: {
    SET_CURRENT_TABBAR (state, idx) {
      state.tabbarCurrentIndex = idx
    },
    SET_PRODUCT_IMG_LIST(state, data) {
      state.productImgList = data
    },
    SET_TABBAR_TAG(state, {idx, num}) {
      // state.tabTags[idx] = num
      const tempTags = objTranslate(state.tabTags)
      console.log(tempTags)
      tempTags[idx] = num
      state.tabTags = objTranslate(tempTags)
    },
    SET_BIZ_INFO(state, data) {
      state.bizInfo = data
      ls.set('bizInfo', data, 1)
    },
    SET_INIT_INFO(state, val) {
      state.initInfo = val
      ls.get('initInfo', val, 1)
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

    getTabbarTags: (state) => () => {
      return state.tabTags
    },
    tabbarCurrentIndex: (state) => state.tabbarCurrentIndex ? state.tabbarCurrentIndex : 0,
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
    /**
     *
     * @param state
     * @param commit
     * @param storage 可选值为 local online 分别从本地和线上去
     * @returns {Promise<void>}
     */
    async getInitInfo({state, commit}, conf) {
      const {storage = 'local'} = conf
      console.log(conf,storage)
      var data
      if (storage === 'local') {
        data = state.initInfo || ls.get('initInfo')
        if (!data)data = false
        return data
      }
      if (storage === 'online') {
        data = await initInfo().then(res => {
          commit('SET_INIT_INFO', res.data)
          return res.data
        }).catch(err => { throw Error(err.msg) })
        if (!data) return false
        return data
      }
    },
    setInitInfo({commit}, val) {
      commit('SET_INIT_INFO', val)
    },
    tabbarTagAdd: ({state, commit}, {idx, num = 1}) => {
      console.log(idx, num)
      const tempNum = state.tabTags[idx]
      const newNum = tempNum + num // 可以正负
      if (newNum < 0) throw Error('数据不能为负')
      commit('SET_TABBAR_TAG', {idx, num: newNum})
    },
    tabbarTagClear: ({state, commit}, {idx}) => {
      commit('SET_TABBAR_TAG', {idx, num: 0})
    },
    setTabActiveIdx: ({commit}, value) => {
      commit('SET_CURRENT_TABBAR', value)
    },
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
