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
