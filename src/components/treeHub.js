import {
  findArrayIdx,
  objTranslate, plainArray, ls
} from '../common/helper'

export class TreeHub {
  // nodes = []
  nodeKey = ''
  checks = []
  ENV = null
  eid = ''
  constructor(options) {
    const {treeData, nodeKey, eid, has = [],childrenName} = options
    if (!nodeKey) {
      throw Error('nodeKey必须设置')
    }
    if (!eid) {
      throw Error('eid必须设置')
    }

    this.eid = eid

    let nodes = []
    plainArray(treeData, childrenName, nodes)

    //has
    if (has.length > 0) {
      for (let i in nodes) {
        if (has.includes(nodes[i][nodeKey])) {
          nodes[i].check = true
        }
      }
    }

    // 我居然行到tree来搞定储存，真是牛逼
    ls.set(eid, nodes)
  }

  static getCHeckList(eid) {
    let nodes = ls.get(eid)
    const checkList = nodes.filter(({check}) => check)
    return checkList
  }

  static addCheck(eid, item, key) {
    let nodes = ls.get(eid)
    const idx = findArrayIdx(nodes, {[key]: item[key]})
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = true
      ls.set(eid, nodes)
    }
  }

  static removeCheck(eid, item, key) {
    let nodes = ls.get(eid)
    const idx = findArrayIdx(nodes, {[key]: item[key]})
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = false
      ls.set(eid, nodes)
    }
  }
}
