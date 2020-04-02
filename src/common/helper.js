import {
  staticUrl
} from './env'
import {
  error, toast
} from './fun'
import {
  upload, getAccessToken
} from './request'

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

/**
 * 从元素是对象的一维数组中，获取指定的键名对应的值组成的简单值一维数组
 * @param arr
 * @param column
 * @returns {[]}
 */
export const getArrColumn = (arr, column) => {
  if (!Array.isArray(arr)) {
    throw new Error('数据必传')
  }
  if (typeof column !== 'string') {
    throw new Error('键名为字符串')
  }
  if (!column) {
    throw new Error('键名必传')
  }
  let rt = []
  for (var k in arr) {
    if (typeof arr[k] !== 'object') {
      throw new Error('获取的数值为简单值')
    }
    rt.push(arr[k][column])
  }
  return rt
}

/**
 * 获取图片
 * @param count
 * @param sizeType
 * @returns {Promise<unknown>}
 */
export const chooseImageByPromise = ({count = 1, sizeType = ['original', 'compressed']} = {}) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      success(res) {
        resolve(res.tempFiles)
      },
      fail(e) {
        reject(new Error(false))
      },
      complete() {

      }
    })
  })
}

/**
 * 批量上传照片
 * @param imgs string:[]
 * @param name 标识
 * @param data 业务参数:{}
 * @returns {Promise<unknown>}
 */
export const uploadImages = ({imgs, name = 'image', data, progressList = []}) => {
  let taskList = []
  console.log(imgs, 'ssss')
  for (let i = 0; i < imgs.length; i++) {
    let taskItem = upload({
      filePath: imgs[i],
      idx: i,
      name,
      progressList,
      formData: data
    })
    taskList.push(taskItem)
  }

  return new Promise((resolve, reject) => {
    Promise.all(taskList).then((urls) => {
      resolve(urls)
    }).catch((error) => {
      reject(new Error(error))
    })
  })
}

/**
 * 数据校验
 * @param data
 * @param rule
 * @returns {boolean}
 */
export const validateFun = (data, rule) => {
  const rt = wx.$validate(data, rule)
  return rt === undefined ? true : rt
}

/**
 * 传入一个数组对象和一个符号
 * @param
 * @param 返回 组成的字符串
 * @returns
 */
export const getString = (arr, key, mbx = 99) => {
  if (!Array.isArray(arr)) {
    throw new Error('数据必传')
  }
  if (mbx === 99) {
    let str = []
    for (let item of arr) {
      str.push(item[key])
    }
    return str
  } else {
    let str = ''
    for (let item of arr) {
      str += item[key] + mbx
    }
    str = str.substring(0, str.length - 1)
    return str
  }
}


export const getDomain = (url) => {

  if (!url) return ''
  if (url.indexOf('http') === -1) return staticUrl + url
  return url
}

export const confirm = (options) => {
  return new Promise(function (resolve, reject) {
    wx.showModal({
      ...options,
      success: function (res) {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

/**
 * 检测是否登录
 * @param redirect
 * @return {boolean}
 */
export const checkIsLogin = (redirect = 1, tip = 0) => {
  let access_token = getAccessToken()

  if (!access_token) {
    if (redirect) {
      if (!tip) {
        wx.navigateTo({
          url: '/pages/user/login'
        })
        return
      }

      confirm({title: '提示', content: '该操作需要登录,请问是否登录?', confirmText: '去登录', cancelText: '暂不登录'}).then(() => {
        wx.navigateTo({
          url: '/pages/user/login'
        })
      }).catch(() => {})
    }
    return false
  }

  return true
}
