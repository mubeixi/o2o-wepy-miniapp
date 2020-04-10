import Renderer from '../lib/f2-canvas/renderer'
import F2 from '../lib/f2-canvas/f2'

F2.Util.addEventListener = function(source, type, listener) {
  source.addListener(type, listener)
}

F2.Util.removeEventListener = function(source, type, listener) {
  source.removeListener(type, listener)
}

F2.Util.createEvent = function(event, chart) {
  const type = event.type
  let x = 0
  let y = 0
  const touches = event.touches
  if (touches && touches.length > 0) {
    x = touches[0].x
    y = touches[0].y
  }

  return {
    type,
    chart,
    x,
    y
  }
}

// 暴露出去省的每个地方都引入了
export const createF2Chart = (opts) => new F2.Chart(opts)

export const F2Mixin = {

  data: {

  },
  methods: {
    init(callback) {
      const version = wx.version.version.split('.').map(n => parseInt(n, 10))
      const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9) ||
        (version[0] === 1 && version[1] === 9 && version[2] >= 91)
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。')
        return
      }

      const ctx = wx.createCanvasContext(this.canvasId, this.$wx) // 获取小程序上下文
      const el = new Renderer(ctx)
      this.canvas = el

      const query = wx.createSelectorQuery().in(this.$wx)
      query.select('.f2-canvas').boundingClientRect(res => {

        let {width,height} = res
        const config = {width,height,...this.conf}
        if (typeof callback === 'function') {
          this.chart = callback(el, config,this.propData)
        } else if (this.onInit) {
          this.chart = this.onInit(el, config,this.propData)
        }
      }).exec()
    },
    touchStart(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchstart', [e])
      }
    },
    touchMove(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchmove', [e])
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e])
      }
    },
    press(e) {
      if (this.canvas) {
        this.canvas.emitEvent('press', [e])
      }
    }
  },
  ready() {
    if (!this.lazyLoad) {
      this.init()
    }
  },
}
