
function withData(param) {
  return param < 10 ? '0' + param : '' + param
}
function getLoopArray(start, end, unit = '') {
  var _start = start || 0
  var _end = end || 1
  var array = []
  for (var i = _start; i <= _end; i++) {
    array.push(withData(i + unit))
  }
  return array
}
function getMonthDay(year, month) {
  let flag = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  let array = null
  // console.log(month)
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
    case '1月':
    case '3月':
    case '5月':
    case '7月':
    case '8月':
    case '10月':
    case '12月':
      array = getLoopArray(1, 31, '日')
      break
    case '04':
    case '06':
    case '09':
    case '11':
    case '4月':
    case '6月':
    case '9月':
    case '11月':
      array = getLoopArray(1, 30, '日')
      break
    case '02':
    case '2月':
      array = flag ? getLoopArray(1, 29, '日') : getLoopArray(1, 28, '日')
      break
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array
}
function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date()
  const year = withData(newDate.getFullYear()),
    mont = withData(newDate.getMonth() + 1),
    date = withData(newDate.getDate()),
    hour = withData(newDate.getHours()),
    minu = withData(newDate.getMinutes())
  // seco = withData(newDate.getSeconds());

  return [year, mont, date, hour, minu]
}

/**
 * 多了单位
 * @returns {string[]}
 */
function getNewDateArryByStr() {
  // 当前时间的处理
  var newDate = new Date()
  var year = newDate.getFullYear() + '年',
    mont = (newDate.getMonth() + 1) + '月',
    date = newDate.getDate() + '日',
    hour = newDate.getHours() + '时',
    minu = newDate.getMinutes() + '分',
    seco = newDate.getSeconds() + '秒'

  return [year, mont, date, hour, minu,seco]
}
const cutTimeStr = (str) => str.substring(0, str.length - 1)
function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], []]
  var start = startYear || new Date().getFullYear()
  var end = endYear || 2100
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArryByStr()
  console.log('defaultDate is', defaultDate)
  // 处理联动列表数据
  /* 年月日 时分秒 */
  dateTimeArray[0] = getLoopArray(start, end, '年')
  dateTimeArray[1] = getLoopArray(1, 12, '月')
  const tempTime = getNewDateArry()
  dateTimeArray[2] = getMonthDay(tempTime[0], tempTime[1])
  dateTimeArray[3] = getLoopArray(0, 23, '时')
  dateTimeArray[4] = getLoopArray(0, 59, '分')
  dateTimeArray[5] = getLoopArray(0, 59, '秒')
  // console.log(dateTimeArray)
  dateTimeArray.forEach((current, index) => {
    const idx = current.indexOf(defaultDate[index]) ? current.indexOf(defaultDate[index]) : 0
    dateTime.push(idx)
  })

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}
module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  getNewDateArry: getNewDateArry
}
