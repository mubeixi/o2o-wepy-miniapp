import {ls as Storage} from '@/common/helper'
import { modal } from '@/common/fun'

const state = {
  tabbarCurrentIndex: 0,
  tabTags: [0, 0]
}

const mutations = {
  SET_CURRENT_TABBAR (state, idx) {
    state.tabbarCurrentIndex = idx
  },
  SET_TABBAR_TAG(state, {idx, num}) {
    state.tags[idx] = num
  }
}

const actions = {
  tabbarTagAdd: ({state, commit}, {idx, num = 1}) => {
    const tempNum = state.tags[idx]
    const newNum = tempNum + num // 可以正负
    if (newNum < 0) throw Error('数据不能为负')
    commit('SET_TABBAR_TAG', {idx, num: newNum})
  },
  tabbarTagClear: ({state, commit}, {idx}) => {
    commit('SET_TABBAR_TAG', {idx, num: 0})
  },
  setTabActiveIdx: ({commit}, value) => {
    commit('SET_CURRENT_TABBAR', value)
  }
}

const getters = {
  getTabbarTags: (state) => () => {
    return state.tags
  },
  tabbarCurrentIndex: (state) => state.tabbarCurrentIndex ? state.tabbarCurrentIndex : 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
