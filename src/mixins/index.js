import {
  linkTo, toast, error, back
} from '../common/fun'

export default {
  data: {
    menuButtonInfo: {},
    systemInfo: {statusBarHeight: 0},
    diyHeadHeight: 0,
    diyHeadRight: 0
    // mixin: 'PageMin'
  },

  methods: {
    $back:back,
    $linkTo: linkTo,
    $toast: toast,
    $error: error,
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap () {
      // console.log('tap in mixin')
    }
  },
  created () {
    // console.log('created in mixin')
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
