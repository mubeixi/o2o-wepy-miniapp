import * as ENV from './env'
// import store from '../store'
import {
  error
} from './fun'

export const ajax = (url, method, data, options) => {
  if (!options) options = {}
  if (!data) data = {}

  let {tip = '', mask = false, timelen = 2000, timeout = 1000, errtip = true} = options

  if (tip) {
    wx.showLoading({
      title: tip,
      mask: mask,
      timelen
    })
  }

  // let token
  var header = {
    // 'Authorization': 'Bearer ' + token,
    'content-type': 'application/x-www-form-urlencoded'
  }
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }
  let URL = ''
  URL = ENV.apiBaseUrl + url
  const hookErrorCode = [0]

  return new Promise((resolve, reject) => {
    wx.request({
      header,
      url: URL,
      method,
      data,
      success: (ret) => {
        const {statusCode, data} = ret
        if (statusCode !== 200 || typeof data !== 'object') {
          error('服务器去旅行了')
          reject(new Error('服务器去旅行了'))
        }
        const {data: res} = ret

        const {errorCode = 1, msg = '请求未成功'} = res

        if (hookErrorCode.indexOf(errorCode) !== -1) {
          resolve(res)
        } else {
          if (errtip) error(msg)
          reject(res)
        }
      },
      fail: (e) => {
        if (errtip) error(e.errMsg)
        reject(e)
      },
      complete: () => {
        if (tip) {
          setTimeout(function () {
            wx.hideLoading()
          }, timeout)
        }
      }
    })
  })
}

export const post = (url, data, options) => {
  return ajax(url, 'post', data, options)
}

export const get = (url, data, options) => {
  return ajax(url, 'get', data, options)
}

export const fetch = function ({act, param, options = false, url = '/api/little_program/shopconfig.php', method = 'post'}) {
  try {
    const data = {...param}
    return ajax(url, method, data, options)
  } catch (e) {
    console.log('request error :' + JSON.stringify(e))
  }
}

export default {
  ajax,
  post,
  get
}





