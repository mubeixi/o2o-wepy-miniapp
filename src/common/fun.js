import apiBaseUrl from './env'
import {createToken} from './request'
export const toast = (title, icon, image, duration) => {
  wx.showToast({
    title,
    duration: duration || 2000,
    icon,
    image
  })
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
  if (!title) return
  if (title.length > 6) {
    // 显示所有的问题
    toast(title, 'none', '', duration)
  } else {
    toast(title, 'none', '/static/icon_http_error.png', duration)
  }
}

export const modal = (content = '', title = '提示') => {
  wx.showModal({
    title: title,
    content: content
  })
}

export const back = () => wx.navigateBack()

export const linkTo = (url, type = 'default') => {
  if (type === 'default') {
    wx.navigateTo({
      url,
      fail(err) {
        console.log(err)
        wx.switchTab({
          url
        })
      }
    })
  }
}

export const showLoading = (title, mask = true) => {
  wx.showLoading({
    title,
    mask
  })
}
export const hideLoading = () => {
  wx.hideLoading()
}
