import { fetch } from '../common/request'

// 获取商家入驻行业列表
export const bizIndustryList = (param, options) => fetch({act: 'bizIndustryList', param, options})


// 获取物流模板列表
export const getShippingTemplate = (param, options) => fetch({act: 'getShippingTemplate', param, options})

// 添加、修改物流模板
export const opShippingTemplate = (param, options) => fetch({act: 'opShippingTemplate', param, options})

// 获取模板详情
export const getTemplateDetail = (param, options) => fetch({act: 'getTemplateDetail', param, options})

// 获取同城配送参数
export const getCityExpressConfig = (param, options) => fetch({act: 'getCityExpressConfig', param, options})
// 同城配送配置编辑
export const opCityExpressConfig = (param, options) => fetch({act: 'opCityExpressConfig', param, options})

// 开启和关闭对应同城配送服务商
export const cityExpressProvider = (param, options) => fetch({act: 'cityExpressProvider', param, options})


// 获取商家详情和入驻信息
export const getBizInfo = (param, options) => fetch({act: 'getBizInfo', param, options})
// 添加、修改商家信息
export const opBizInfo = (param, options) => fetch({act: 'opBizInfo', param, options})

// 发送验证码
export const bizRegSms = (param, options) => fetch({act: 'bizRegSms', param, options})

// 获取城市列表
export const getCityList = (param, options) => fetch({act: 'getCityList', param, options})


// 获取会员等级列表
export const getUserLevel = (param, options) => fetch({act: 'getUserLevel', param, options})

// 获取优惠券列表
export const getCouponList = (param, options) => fetch({act: 'getCouponList', param, options})

// 获取优惠券列表
export const opCoupon = (param, options) => fetch({act: 'opCoupon', param, options})

