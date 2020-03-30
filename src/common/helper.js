import {
  error, toast
} from './fun'

export const objTranslate = (obj) => JSON.parse(JSON.stringify(obj))

export const ls = {
  set(key, val, cover) {
    if (!cover && !val && (val !== 0 || val !== false)) return false

    return wx.setStorageSync(key, val)
  },

  get(key) {
    try {
      var val = wx.getStorageSync(key)
      return val
    } catch (e) {
      // error
      wx.showModal(`获取Storage失败，key：${key}`)
    }
  },
  remove(key) {
    return wx.removeStorageSync(key)
  },
  clear() {
    return wx.clearStorageSync()
  }
}

function checkValue(val, vals) {
  let _val = val
  if (Number.isNaN(val)) {
    _val = 'NaN'
  }
  return vals.indexOf(_val) !== -1
}

/**
 * 清理对象中多余的属性
 * @param obj
 * @param strice
 * @param tip
 * @param clearValues
 * @returns {*}
 */
export const emptyObject = (obj, strice, tip, clearValues = [null, undefined, '', 'null', 'undefined']) => {
  for (var prop in obj) {
    if (checkValue(obj[prop], clearValues)) {
      if (strice) {
        tip && error('参数' + prop + '不能为空')
        console.log('参数' + prop + '不能为空')
        return false
      }
      delete obj[prop]
    }
  }
  return obj
}

/**
 * 指定key，铺平二维数组，一般用于将树状的菜单、分类（数据结构一致，但是利用child这种来标识上下级)
 * 使平铺城1维数组
 */

export const plainArray = (arr, key, newArr) => {
  if (!arr || !key) return false

  for (var item of arr) {
    let tempObj = objTranslate(item)
    if (tempObj.hasOwnProperty(key)) {
      delete tempObj[key]
    }
    newArr.push(tempObj)

    if (item && item[key] && Array.isArray(item[key])) {
      plainArray(item[key], key, newArr)
    }
  }
}

/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param arr
 * @param key
 * @param val
 * @param full 是否返回值和下标，默认只返回下标
 */
export const findArrayIdx = (arr, keyValArr, full = false) => {
  for (var i in arr) {
    if (typeof arr[i] !== 'object') continue

    // 用来比较对象
    if (compareObj(keyValArr, arr[i])) {
      if (!full) return i
      return {val: arr[i], idx: i}
    }
  }
  return false
}

/**
 * 查看对象1中的所有属性在obj2中都有
 * @param obj1
 * @param obj2
 */
export const compareObj = (obj1, obj2) => {
  for (var i in obj1) {
    if (!obj1.hasOwnProperty(i)) continue
    if (!obj2.hasOwnProperty(i) || obj1[i] != obj2[i]) {
      return false
    }
  }
  return true
}
