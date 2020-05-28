import { back, error, linkTo, modal, toast } from '../common/fun'
import { ls } from '../common/helper'
import eventHub from '../common/eventHub'

/**
 * 自定义处理错误
 * @param msg
 * @constructor
 */
export function FunError(e) {
  let {message = '错误信息', type = 'toast', icon = 'none'} = e
  if (typeof e !== 'object') {
    message = e
  }
  if (type === 'toast')toast(message, icon)
  if (type === 'modal')modal(message)
  return ({message, type, icon})
}
FunError.prototype = Object.create(Error.prototype)
FunError.prototype.constructor = FunError

export default {
  data: {
    menuButtonInfo: {},
    systemInfo: {statusBarHeight: 0},
    diyHeadHeight: 0,
    diyHeadRight: 0,
    currentPagePath: ''
    // mixin: 'PageMin'
  },

  methods: {
    $back: back,
    $linkTo: linkTo,
    $toast: toast,
    $error: error,
    $openPop(name) {
      this.$refs[name].show()
    },
    $closePop(name) {
      this.$refs[name].close()
    },
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap () {
      // console.log('tap in mixin')
    },
    getCurrentPageRoute() {
      const pageInstanceList = getCurrentPages()
      const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
      return currentPagePath
    }
  },
  created () {
    // console.log('created in mixin')
  },
  onReady() {
    ls.set('currentPagePath', this.getCurrentPageRoute())// 标记当前的页面，这样就不会每个事件都响应了
    this.currentPagePath = this.getCurrentPageRoute()
    eventHub.$on('IM_EVENT', (res) => {
      console.log(res)
    })

    eventHub.$on('IM_TAKE_MSG', (res) => {
      // 只有当前页面响应
      console.log(ls.get('currentPagePath'), this.currentPagePath)
      if (ls.get('currentPagePath') === this.currentPagePath) {
        console.log(res,this.$refs)
        if (this.$refs.hasOwnProperty('wzwImTip')) this.$refs.wzwImTip.show(res)
      }
    })
  },
  onLoad() {
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.systemInfo = wx.getSystemInfoSync()
    const {height, top, left} = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
  }
}

export const componentMixins = {
  data: {
    menuButtonInfo: {},
    systemInfo: {statusBarHeight: 0},
    diyHeadHeight: 0,
    diyHeadRight: 0
    // mixin: 'PageMin'
  },

  methods: {
    $back: back,
    $linkTo: linkTo,
    $toast: toast,
    $error: error,
    $openPop(name) {
      this.$refs[name].show()
    },
    $closePop(name) {
      this.$refs[name].close()
    },
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap () {
      // console.log('tap in mixin')
    }
  },
  ready() {
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.systemInfo = wx.getSystemInfoSync()
    const {height, top, left} = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
  }
}
