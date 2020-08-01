/**
 * 各种抽奖专用文件
 */

// const random = function (rate) {
//   var random = Math.floor(Math.random() * 100)
//   var myRandom = []
//   var randomList = []
//   var randomParent = []
//   for (var i = 0; i < 100; i++) {
//     myRandom.push(parseInt([i]) + 1)
//   }
//   for (var i = 0; i < rate.length; i++) {
//     var temp = []
//     var start = 0
//     var end = 0
//     randomList.push(parseInt(rate[i].split('%')[0]))
//     for (var j = 0; j < randomList.length; j++) {
//       start += randomList[j - 1] || 0
//       end += randomList[j]
//     }
//     temp = myRandom.slice(start, end)
//     randomParent.push(temp)
//   }
//   for (var i = 0; i < randomParent.length; i++) {
//     if (randomParent[i].indexOf(random) > 0) {
//       return (i + 1)
//     }
//   }
// }

const createRandomColor = () => {
  let color = Math.floor((Math.random() * 256 * 256 * 256)).toString(16)
  while (color.length < 6) { // 随机生成的可能只有3-6位字符串
    color += Math.floor((Math.random() * 16)).toString(16)
  }
  return `#${color}`
}

/**
 * 大转盘类
 */
export class Rotate {
  constructor () {
    this.speed = 200 // 速度,多少毫秒转一格,数越大越慢
    this.len = 0 // 多少个格子
    this.idx = -1 // 当前指向
    this.rotateNum = 1
    this.rotate_count = 0
    this.luckNum = 0
    this.is_start = 0 // 是否在转了
    this.call = false
    this.intervalInstance = null
    this.reward = null
    this.ids = []
    this.randomRate = []
    this.imgs = []
    this.names = []
    this.colors = []
  }

  setCallFn (fn) {
    this.call = fn
  }

  isStart () {
    return this.is_start
  }

  getItemList () {
    const rt = this.colors.map((item, idx) => {
      return {
        color: item,
        name: this.names[idx],
        img: this.imgs[idx],
        id: this.ids[idx]
      }
    })
    return rt
  }

  getIdx () {
    return this.idx
  }

  getBgColor (idx) {
    return this.colors[idx]
  }

  getNameList () {
    return this.names
  }

  setList (list) {
    // this.radomRate = []
    this.names = []
    this.colors = []
    this.imgs = []
    this.ids = []

    for (var item of list) {
      // radomRate.push(item.radomRate)
      this.imgs.push(item.img_url)
      this.names.push(item.title)
      this.ids.push(item.id)
      this.colors.push(createRandomColor())
    }
    this.len = list.length
  }

  setSpeed (speed) {
    this.speed = parseInt(speed * 100) / 100
  }

  setReward (reward) {
    this.reward = reward
  }

  // 旋转转盘 item:奖品位置; txt：提示语;
  /**
   *
   * @param luckNum 奖品位置
   * @param rotateNum 要转圈的位置
   */
  rotateFn () {
    if (this.idx === this.len - 1) {
      this.idx = 0
      this.rotate_count++
    } else {
      this.idx++
    }

    // 最后一圈速度越来越慢
    if (this.rotate_count === this.rotateNum - 1) {
      if (this.speed < 800) {
        this.speed += 10 * this.idx
      }
    } else {
      // 开始越来越快
      if (this.speed > 60) {
        this.speed -= 10
      }
    }

   // console.log(this.rotate_count,this.rotateNum,this.idx + 1,this.luckNum)
    // 满这么多圈
    // 下标对了
    if (this.rotate_count === this.rotateNum && this.idx + 1 === this.luckNum) {
      this.end()
    } else {
      setTimeout(this.rotateFn.bind(this), this.speed)
    }
  }

  setRotateNum (num) {
    this.rotateNum = parseInt(num)
  }

  setLuckNum (id) {
    this.luckNum = parseInt(id)
  }

  _init () {
    this.len = this.names.length
    this.speed = 200
    this.rotate_count = 0
    this.is_start = 0
  }

  /**
   *
   * @param {Number}num 最少多少圈
   * @param {Number}offest 随机增加多少圈
   */
  start (num, offest) {
    if (!num) num = 99
    if (!offest) offest = 10
    this._init()
    // 获取随机数(奖品个数范围内)
    // this.luckNum = random(this.randomRate)
    // if(!this.luckNum)return;

    this.idx = 0// 恢复光标

    this.rotateNum = parseInt(Math.random() * offest + num) // 5圈起步，最多10圈

    this.is_start = 1
    this.rotateFn()
  }

  // 撒花
  end () {
    const _self = this
    setTimeout(function () {
      // uni.showModal({
      //     title:"中奖提示",
      //     content:'恭喜中奖，中奖id:'+_self.idx+'中奖内容为'+_self.names[_self.idx]
      // })
      _self.call && _self.call(_self.idx, _self.names[_self.idx])
      _self._init()
    }, 500)
  }
}
