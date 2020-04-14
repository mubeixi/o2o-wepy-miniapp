import { fetch } from '../common/request'

// 订单列表
export const getOrder = (param, options) => fetch({act: 'get_order', param, options})

// 拒单
export const systemRejectOrder = (param, options) => fetch({act: 'system_reject_order', param, options})

// 订单详情
export const getOrderDetail = (param, options) => fetch({act: 'get_order_detail', param, options})

// 获取合作公司
export const getAvailableCityExpress = (param, options) => fetch({act: 'getAvailableCityExpress', param, options})

// 获取合作公司
export const systemSendOrder = (param, options) => fetch({act: 'system_send_order', param, options})

// 获取商品下单模板详情或者列表
export const getBizOrderTemplateList = (param, options) => fetch({act: 'getBizOrderTemplateList', param, options})

// 删除下单模板
export const delBizOrderTemplate = (param, options) => fetch({act: 'delBizOrderTemplate', param, options})

// 添加编辑下单模板
export const opBizOrderTemplate = (param, options) => fetch({act: 'opBizOrderTemplate', param, options})
