import { findArrayIdx, ls } from '@/common/helper'
import eventHub from '@/common/eventHub'

const plainArrayByTree = ({ arr, key, newArr, pidKey, nodeKey }) => {
  try {
    if (!arr || !key) return false
    if (!Array.isArray(arr) || !Array.isArray(newArr)) {
      return false
      // throw Error('两个参数都要为数组')
    }

    for (var item of arr) {
      // 存下标（如果有上级的话，那么就是他了)
      // console.log({[nodeKey]: item[pidKey]})
      const parentIdx = findArrayIdx(newArr, { [nodeKey]: item[pidKey] })
      const parent = parentIdx === false ? '' : Number(parentIdx)

      let tempObj = Object.assign({ parent }, item)
      if (tempObj.hasOwnProperty(key)) {
        delete tempObj[key]
      }
      newArr.push(tempObj)

      if (item && item[key] && Array.isArray(item[key])) {
        plainArrayByTree({ arr: item[key], key, newArr, pidKey, nodeKey })
      }
    }
  } catch (e) {
    console.log(e)
    throw Error('tree组件数据平铺时遇到错误' + e.message)
  }
}

/**
 *
 * 2020.3.16 我居然想到tree来搞定储存，真是牛逼
 * 2020.5.16 我居然想到用Storage来存未知大小长度的数据，真是蠢
 * 2020.7.28 Storage存储和读取效率太低，用vuex或者global
 *
 *
 */

export class TreeHub {
  nodeKey = ''
  checks = []
  ENV = null
  eid = ''
  static storage = 'runtime' // runtime vuex local

  constructor({ treeData, nodeKey, eid, has = [], childrenName, pidKey, plainArrayList = false }) {
    // console.log(nodeKey, eid, childrenName, pidKey)
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
      plainArrayByTree({ arr: treeData, key: childrenName, newArr: nodes, pidKey, nodeKey })
    }

    // has
    if (has.length > 0) {
      for (let i in nodes) {
        if (has.includes(nodes[i][nodeKey]) || has.includes('' + nodes[i][nodeKey])) {
          nodes[i].check = true
        }
      }
    }

    TreeHub.setTreeData(eid, nodes)
  }

  static setTreeData(eid, nodes) {
    if (TreeHub.storage === 'runtime') {
      eventHub[eid] = nodes
      // console.log(eventHub[eid])
    }
    if (TreeHub.storage === 'local') {
      ls.set(eid, nodes)
    }
  }

  static getTreeData(eid) {
    if (TreeHub.storage === 'runtime') {
      return eventHub[eid]
    }
    if (TreeHub.storage === 'local') {
      return ls.get(eid)
    }
  }

  /**
   *
   * @param eid
   * @param item
   * @param nodeKey
   * @param changes
   * @param autoSelectParent 是否只要有一个下级选中，就自动选中上级（奇葩需求)
   */
  static updateTreeUp({ eid, item, nodeKey, changes, autoSelectParent = false }) {
    let nodes = TreeHub.getTreeData(eid)
    const idx = findArrayIdx(nodes, { [nodeKey]: item[nodeKey] })
    if (idx === false) return

    // function checkNodeChildAllCheck(parentIdx) {
    //   var result = true
    //   for (var i in nodes) {
    //     if (Number(nodes[i].parent) === Number(parentIdx)) {
    //       // 只要有一个没选中的，就不能全选
    //       if (!nodes[i].check) {
    //         result = false
    //         break
    //       }
    //
    //       // 是否还要继续看呢?
    //       // 每个人的都只看自己的直接下级即可？？
    //       // const filterResult = nodes.filter(node => Number(node.parent) === Number(i))
    //       // if (filterResult.length > 0) {
    //       //   if (!checkNodeChildAllCheck(i)) {
    //       //     result = false
    //       //     break
    //       //   }
    //       // }
    //     }
    //   }
    //   return result
    // }

    // 递归到哭
    function updateParentAttr(index) {
      var self = nodes[index]
      if (self.parent === '') return

      // 比较父级了,而且要确认所有子集都选中
      var parentIdx = Number(self.parent)
      const childList = nodes.filter(node => node.parent !== '' && Number(node.parent) === Number(parentIdx))

      // 大于零即可
      if (autoSelectParent) {
        nodes[parentIdx].check = childList.filter(node => node.check).length > 0 // checkNodeChildAllCheck(parentIdx)
      } else {
        nodes[parentIdx].check = childList.length === childList.filter(node => node.check).length // checkNodeChildAllCheck(parentIdx)
      }

      // 如果还有上级的话
      if (nodes[parentIdx].parent >= 0 && nodes[parentIdx].parent !== '') {
        updateParentAttr(nodes[parentIdx].parent)
      }
    }

    updateParentAttr(idx)
    TreeHub.setTreeData(eid, nodes)
  }

  static updateTreeDown({ eid, item, nodeKey, changes }) {
    let nodes = TreeHub.getTreeData(eid)
    const idx = findArrayIdx(nodes, { [nodeKey]: item[nodeKey] })
    if (idx === false) return

    // 递归到哭
    function updateChildAttr(parentIdx) {
      // console.log(parentIdx)
      for (var i in nodes) {
        if (nodes[i].parent === '') continue
        if (Number(nodes[i].parent) === Number(parentIdx)) {
          // console.log(i, '---------------------', nodes[i].parent)
          for (let key in changes) {
            nodes[i][key] = changes[key]
          }

          // 如果还有下级的话
          const filterResult = nodes.filter(node => Number(node.parent) === Number(i))
          if (filterResult.length > 0) {
            updateChildAttr(i)
          }
        }
      }
    }

    updateChildAttr(idx)
    TreeHub.setTreeData(eid, nodes)
  }

  static getCHeckList(eid) {
    let nodes = TreeHub.getTreeData(eid)
    // let nodes = getApp().globalData[eid]
    var checkList = []
    if (Array.isArray(nodes)) {
      checkList = nodes.filter(({ check }) => check)
    }
    return checkList
  }

  static addCheck(eid, item, key) {
    // console.log(eid)
    let nodes = TreeHub.getTreeData(eid)
    // console.log(nodes)
    // let nodes = getApp().globalData[eid]
    const idx = findArrayIdx(nodes, { [key]: item[key] })
    // console.log(idx)
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = true
      // ls.set(eid, nodes)
    }
    // 二级未选中的时候 清空父级的状态
    // const idxParent = findArrayIdx(nodes, { [key]: item['Category_ParentID'] })
    // if (idxParent !== false) {
    //   nodes[idxParent].check = true
    // }
    //
    // // 三级的时候
    // if (item.level == 2) {
    //   const idxLast = findArrayIdx(nodes, { [key]: nodes[idxParent]['Category_ParentID'] })
    //   if (idxParent !== false) {
    //     nodes[idxLast].check = true
    //   }
    // }

    TreeHub.setTreeData(eid, nodes)
  }

  static removeCheck(eid, item, key) {
    // let nodes = getApp().globalData[eid]
    let nodes = TreeHub.getTreeData(eid)
    const idx = findArrayIdx(nodes, { [key]: item[key] })
    // 得不存在，才能加入
    if (idx !== false) {
      nodes[idx].check = false
    }

    let parId = item['Category_ParentID']
    let boo = true
    for (let code of nodes) {
      if (code['Category_ParentID'] == parId && code.check == true) {
        boo = false
      }
    }

    // // 二级未选中的时候 清空父级的状态
    // const idxParent = findArrayIdx(nodes, { [key]: item['Category_ParentID'] })
    // if (idxParent !== false && boo) {
    //   nodes[idxParent].check = false
    // }
    //
    // // 三级的时候
    // if (item.level == 2) {
    //   const idxLast = findArrayIdx(nodes, { [key]: nodes[idxParent]['Category_ParentID'] })
    //   if (idxParent !== false && boo) {
    //     nodes[idxLast].check = false
    //   }
    // }

    TreeHub.setTreeData(eid, nodes)
  }

  static removeAllCheck(eid, key) {
    let nodes = TreeHub.getTreeData(eid)
    // let nodes = getApp().globalData[eid]
    for (let idx in nodes) {
      nodes[idx].check = false
    }
    TreeHub.setTreeData(eid, nodes)
  }
}
