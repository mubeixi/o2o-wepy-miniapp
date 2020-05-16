import { fetch } from '../common/request'

// export const getSystemInfo = (param, options) => fetch({act='',param, options})

// 商家管理端首页初始化接口
export const initInfo = (param, options) => fetch({act: 'initInfo', param, options})
// 用户登录
export const bizLogin = (param, options) => fetch({act: 'bizLogin', param, options})

// 用户登出
export const bizLogout = (param, options) => fetch({act: 'bizLogout', param, options})

// 获取三级联动地址
export const getAreaByPid = (param, options) => fetch({act: 'getAreaByPid', param, options})
