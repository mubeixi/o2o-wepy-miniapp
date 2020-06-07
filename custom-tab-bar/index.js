Component({
  data: {
    selected: 0,
    tags: [0, 0],
    borderStyle: 'black',
    color: '#999999',
    selectedColor: '#26C78D',
    list: [
      {
        pagePath: '/pages/index',
        route: 'pages/index',
        iconPath: '/static/tabbar/find.png',
        selectedIconPath: '/static/tabbar/find-a.png',
        text: '首页'
      },
      {
        pagePath: '/pages/support/ImList',
        route: 'pages/support/ImList',
        iconPath: '/static/tabbar/notify.png',
        selectedIconPath: '/static/tabbar/notify-a.png',
        text: '消息'
      }
    ]
  },
  attached() {

  },
  ready() {
    console.log(this.data.tags)
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({url})
    }
  }
})
