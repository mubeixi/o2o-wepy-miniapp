import * as ENV from './env'
// import store from '../store'
import {
  error, toast
} from './fun'
import {
  emptyObject,
  ls
} from './helper'
import {hexMD5} from './tool/md5'
import Base64 from './tool/base64.js'

export const getUsersID = () => ls.get('users_id') ? ls.get('users_id') : 'wkbq6nc2kc'

export const getAccessToken = () => ls.get('access_token')

export const getUserID = () => ls.get('user_id')

export const getBizId = () => ls.get('biz_id')

export const getEnv = () => 'wx_lp'

export const createToken = function(object) {
  object = ObjectToArr(object)
  var signString = ObjectToString(object)
  signString = signString.slice(0, -1)
  var timestamp = parseInt(new Date().getTime() / 1000).toString()
  var key = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T'
  var dataStr = signString + key + timestamp
  // console.log(Base64)
  var sign = hexMD5(Base64.toBase64(dataStr)).toUpperCase()
  object['timestamp'] = timestamp
  object['sign'] = sign
  object['sortToken'] = 1
  return object
}

// 对象转数组，并排序
function ObjectToArr(object, addkey) {
  addkey = addkey || ''
  var arrs = {}
  for (var i in object) {
    var newkey = addkey + (addkey === '' ? i : '[' + i + ']')
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign' && i !== 'sortToken') {
          arrs[newkey] = object[i]
        }
      }
    } else {
      ObjectToArr(object[i], newkey)
    }
  }
  var newkey_1 = Object.keys(arrs).sort()
  var newObj = {}// 创建一个新的对象，用于存放排好序的键值对

  // 此处不能使用for..in
  newkey_1.forEach(function (val) {
    newObj[val] = arrs[val]// 向新创建的对象中按照排好的顺序依次增加键值对
  })
  return newObj
}

// 对象转字符串
function ObjectToString(object, arrs) {
  arrs = arrs || ''
  for (var i in object) {
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign') {
          arrs += object[i] + ','
        }
      }
    } else {
      arrs += this.ObjectToString(object[i], arrs)
    }
  }
  return arrs
}

class XHR {
  static checkQuick = (act, options) => {
    const d = new Date()
    if (options.hasOwnProperty('is_tap') && options.is_tap) {
      let tempActInfo = ls.get('temp_act_info')
      if (tempActInfo && tempActInfo.hasOwnProperty('act') && tempActInfo.hasOwnProperty('time') && tempActInfo.act && tempActInfo.time) {
        // 同一个请求，不能在0.5s内连点两次
        return act === tempActInfo.act && d.getTime() < (tempActInfo.time + 500)
      }
    }
  }

  static formData = (param) => {
    let _param = {access_token: getAccessToken(), biz_id: getBizId(), env: getEnv(), ...param}

    // 数据加密
    let postData = createToken(_param)
    // 保持签名通过，同时支持传空字符串
    // Object.assign(postData, param)
    return emptyObject(postData)
  }
}

const hookErrorCode = [0, 66001, 88001]
export const ajax = ({url, method = 'post', data = {}, options = {}}) => {
  let {
    tip = '', // loading text
    mask = false,
    // timelen = 2000,
    timeout = 100, // 如果tip参数生效，请求结束后会延迟取消loading,有的请求太快了一闪而过
    errtip = true, // 是否提示错误
    // reqHeader = false, // 是否需要把响应头返回放在resolve里面，一般是有时候登录的时候需要从请求头里拿到token的
    onlyData = false// 是否直接返回data，方便结构赋值
  } = options

  if (tip)wx.showLoading({title: tip, mask})

  // let token
  var header = {
    // 'Authorization': 'Bearer ' + token,
    'content-type': 'application/x-www-form-urlencoded'
  }

  const _url = ENV.apiBaseUrl + url

  return new Promise((resolve, reject) => {
    wx.request({
      header,
      url: _url,
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
          if (errorCode === 66001) {
            error(res.msg)

            // 重置用户信息

            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/user/login'
              })
            }, 500)
            return
          }

          resolve(onlyData ? res.data : res)
        } else {
          // 配置决定是否显示错误提示
          if (errtip) error(msg)
          reject(res)
        }
      },
      fail: (e) => {
        // 标记为http请求出错，而不是业务逻辑返回的错误
        reject(new Error(false))
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

export const fetch = function ({act, param = {}, options = false, url = '/api/little_program/shopconfig.php', method = 'post'}) {
  try {
    if (act) {
      param.act = act
      url = `/api/v1/${act}.html` // 替换url
    } else {
      error('act参数必传')
      return
    }

    param.Users_ID = getUsersID()
    // 如果某接口指定不要User_ID的
    if (options && options.noUid) delete param.User_ID
    // 检查是否同一个接口请求过快
    if (XHR.checkQuick(act, options)) {
      return Promise.reject(new Error('请求过快'))
    }
    // 签名
    const data = XHR.formData(param)
    return ajax({url, method, data, options})
  } catch (e) {
    console.log('request error :' + JSON.stringify(e))
  }
}

export const upload = ({filePath, idx = 0, name = 'image', param = {}, progressList = []}) => {
  let _param = {
    access_token: getAccessToken(),
    Users_ID: getUsersID(),
    env: getEnv(),
    act: 'uploadFile',
    ...param
  }

  const url = `/api/v1/${_param.act}.html`
  const formData = XHR.formData(_param)

  const _url = ENV.apiBaseUrl + url

  return new Promise((resolve, reject) => {
    const uploadTask = wx.uploadFile({
      url: _url,
      filePath,
      name,
      formData,
      success: (res) => {
        let {data = {}} = res
        if (typeof data === 'string' && data) {
          let body = JSON.parse(data)
          data = body.data
        }
        const {path = ''} = data
        if (path) {
          resolve(path)
        } else {
          resolve(false)
          toast('文件上传失败')
        }
      },
      fail: (err) => {
        reject(new Error(err))
      },
      complete: (rt) => {

      }
    })

    uploadTask.onProgressUpdate((res) => {
      // console.log('上传进度' + res.progress)
      // console.log('已经上传的数据长度' + res.totalBytesSent)
      // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)

      if (progressList.length > 0 && progressList[idx] && progressList[idx].hasOwnProperty('task')) {
        progressList[idx].task = res
      }
    })
  })
}

export default {
  ajax
}
