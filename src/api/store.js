import { fetch } from '../common/request'



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


// 获取商家详情和入驻信息
export const getBizInfo = (param, options) => fetch({act: 'getBizInfo', param, options})
// 添加、修改商家信息
export const opBizInfo = (param, options) => fetch({act: 'opBizInfo', param, options})

// 发送验证码
export const bizRegSms = (param, options) => fetch({act: 'bizRegSms', param, options})
