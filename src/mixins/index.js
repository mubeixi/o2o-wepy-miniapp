import { back, error, linkTo, toast } from '@/common/fun'
import { checkIsLogin, getDomain, ls } from '@/common/helper'
import eventHub from '../common/eventHub'

export default {
  data: {
    menuButtonInfo: {},
    systemInfo: { statusBarHeight: 0 },
    diyHeadHeight: 0,
    diyHeadRight: 0,
    currentPagePath: ''
    // mixin: 'PageMin'
  },
  methods: {
    getDomain: getDomain,
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
    default_init_func(option) {
      let users_id = option.users_id || ls.get('users_id')
      // 如果连接里面已经有了，就不需要搞事
      if (users_id) {
        // 不管ls有没有，都存一次
        ls.set('users_id', users_id)
      }
      let pid = option.pid
      if (pid) {
        // 不管ls有没有，都存一次
        ls.set('pid', pid)
      }
    },
    mixintap() {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap() {
      // console.log('tap in mixin')
    },
    getCurrentPageRoute() {
      const pageInstanceList = getCurrentPages()
      const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
      return currentPagePath
    }
  },
  created() {
    // console.log('created in mixin')
  },
  onShow() {
    // 这个机制还是要onShow 兼容返回的情况
    ls.set('currentPagePath', this.getCurrentPageRoute())// 标记当前的页面，这样就不会每个事件都响应了
    this.currentPagePath = this.getCurrentPageRoute()

    // 全局判断是否登录跳去登录
    let pathArr = [
      'pages/join/Certification',
      'pages/user/login',
      'pages/index',
      'pages/support/ImList'
    ]

    const pathIndex = pathArr.indexOf(this.currentPagePath)
    console.log(pathIndex, 'sss')
    if (pathIndex === -1) {
      if (!checkIsLogin(1, 0)) return
    }
  },
  onReady() {
    eventHub.$on('IM_EVENT', (res) => {
      console.log(res)
    })

    eventHub.$on('IM_TAKE_MSG', async (res) => {
      // 只有当前页面响应
      console.log(ls.get('currentPagePath'), this.currentPagePath)
      if (ls.get('currentPagePath') === this.currentPagePath) {
        // console.log(res, this.$refs)

        if (this.$refs.hasOwnProperty('wzwImTip')) this.$refs.wzwImTip.show(res)

        if (eventHub.imInstance) {
          const count = await eventHub.imInstance.getNoReadMsgCount()
          if (typeof this.$wx.getTabBar === 'function' && this.$wx.getTabBar()) {
            console.log('更新IM下标数量' + count)
            this.$wx.getTabBar().setData({
              tags: [0, count]
            })
          }
        }
      }
    })
  },
  onLoad(options) {
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.systemInfo = wx.getSystemInfoSync()
    const { height, top, left } = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    const opt = { ...options }
    this.default_init_func(opt)
  }
}

export const componentMixins = {

  data: {
    menuButtonInfo: {},
    systemInfo: { statusBarHeight: 0 },
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
    mixintap() {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap() {
      // console.log('tap in mixin')
    }
  },
  ready() {
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.systemInfo = wx.getSystemInfoSync()
    const { height, top, left } = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
  }
}
