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
    console.log(options)
    const {treeData, nodeKey, eid} = options
    if (!nodeKey) {
      throw Error('nodeKey必须设置')
    }
    if (!eid) {
      throw Error('eid必须设置')
    }

    this.eid = eid

    let nodes = []
    plainArray(treeData, 'child', nodes)
    console.log(nodes)
    // 我居然行到tree来搞定储存，真是牛逼
    ls.set(eid, nodes)
  }

  static addCheck(eid, item, key) {
    let nodes = ls.get(eid)
    const idx = findArrayIdx(nodes, {key: item[key]})
    // 得不存在，才能加入
    if (idx === false) {
      nodes.push(item)
      ls.set(eid, nodes)
    }
  }

  static removeCheck(eid, item, key) {
    let nodes = ls.get(eid)
    const idx = findArrayIdx(nodes, {key: item[key]})
    // 得不存在，才能加入
    if (idx !== false) {
      nodes.remove(idx)
      ls.set(eid, nodes)
    }
  }
}
