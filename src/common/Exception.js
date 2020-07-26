import { modal, toast } from './fun'

/**
 * 异常类——构造函数模式
 */
export function Exception() {

}

/**
 * 异常类——es6模式
 */
// export class Exception {
//   constructor () {
//   }
//
//   handle
// }

/**
 * 自定义处理错误
 * @param msg
 * @constructor
 */
function handle(e) {
  if (typeof e === 'string')e = Error(e)
  if (e === 'nocare' || e.message === 'nocare') return
  let { message = '错误信息', type = 'toast', icon = 'none' } = e
  if (typeof e !== 'object') {
    message = e
  }
  // 开发模式下，全部都弹出来
  console.log(e)
  if (type === 'toast') toast(message, icon)
  if (type === 'modal') modal(message)

  return ({
    message,
    type,
    icon
  })
}

Exception.prototype = {
  constructor: Exception
}
Exception.handle = handle
