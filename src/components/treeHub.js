import { findArrayIdx, ls, plainArray } from '../common/helper'

export class TreeHub {
  // nodes = []
  nodeKey = ''
  checks = []
  ENV = null
  eid = ''
  constructor({treeData, nodeKey, eid, has = [], childrenName, plainArrayList = false}) {
    console.log(nodeKey,eid)
    if (!nodeKey) {
      throw Error('nodeKey必须设置')
    }
    if (!eid) {
      throw Error('eid必须设置')
    }

    this.eid = eid
    let nodes = []
    if (Array.isArray(plainArrayList) && plainArrayList.length > 0) {
      nodes = plainArrayList.concat([])
    } else {
      nodes = []
      plainArray(treeData, childrenName, nodes)
    }

    // console.log('plainArray ready')

    // has
    if (has.length > 0) {
      for (let i in nodes) {
        if (has.includes(nodes[i][nodeKey]) || has.includes('' + nodes[i][nodeKey])) {
          nodes[i].check = true
        }
      }
    }

    // 我居然想到用ls来存未知大小长度的数据，真是蠢 2020.5.16
    // 我居然想到tree来搞定储存，真是牛逼 2020.3.16
    ls.set(eid, nodes)
    // console.log(getApp().globalData)
    // getApp().globalData[eid] = nodes
  }

  static getCHeckList(eid) {
    let nodes = ls.get(eid)
    // let nodes = getApp().globalData[eid]
    var checkList = []
    if (Array.isArray(nodes)) {
      checkList = nodes.filter(({check}) => check)
    }
    return checkList
  }

  static addCheck(eid, item, key) {
    // console.log(eid)
    let nodes = ls.get(eid)
    // console.log(nodes)
    // let nodes = getApp().globalData[eid]
    const idx = findArrayIdx(nodes, {[key]: item[key]})
    // console.log(idx)
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = true
      ls.set(eid, nodes)
    }
  }

  static removeCheck(eid, item, key) {
    // let nodes = getApp().globalData[eid]
    let nodes = ls.get(eid)
    const idx = findArrayIdx(nodes, {[key]: item[key]})
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = false
      ls.set(eid, nodes)
    }
  }

  static removeAllCheck(eid, key) {
    let nodes = ls.get(eid)
    // let nodes = getApp().globalData[eid]
    for (let idx in nodes) {
      nodes[idx].check = false
    }
    ls.set(eid, nodes)
  }
}
