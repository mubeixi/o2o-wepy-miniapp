/**
 * promise化接口
 */
const wxPromisify = (functionName, params) => {
  return new Promise((resolve, reject) => {
    wx[functionName]({
      ...params,
      success: res => resolve(res),
      fail: res => reject(res)
    })
  })
}

export default wxPromisify
