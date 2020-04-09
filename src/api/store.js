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

// 添加编辑会员等级列表
export const opBizUserLevel = (param, options) => fetch({act: 'opBizUserLevel', param, options})

// 获取优惠券列表
export const getCouponList = (param, options) => fetch({act: 'getCouponList', param, options})

// 编辑优惠券
export const opCoupon = (param, options) => fetch({act: 'opCoupon', param, options})

// 获取商家自定义分类
export const getBizProdCateList = (param, options) => fetch({act: 'bizProdCateList', param, options})

export const addBizProdCate = (param, options) => fetch({act: 'addBizProdCate', param, options})

// 商家注册
export const bizReg = (param, options) => fetch({act: 'bizReg', param, options})

// 获取商家配置
export const getBizConfig = (param, options) => fetch({act: 'getBizConfig', param, options})

// 获取分类保证金
export const proCate = (param, options) => fetch({act: 'pro_cate', param, options})

// 获取保证金以及支付金额
export const getBizPayAmount = (param, options) => fetch({act: 'getBizPayAmount', param, options})
// 商家入驻订单提交
export const addBizOrder = (param, options) => fetch({act: 'addBizOrder', param, options})
// 商家入驻订单支付
export const bizOrderPay = (param, options) => fetch({act: 'bizOrderPay', param, options})

// 获取自定义类别的详情
export const bizIndustryDetail = (param, options) => fetch({act: 'bizIndustryDetail', param, options})

// 提交入驻申请
export const bizApply = (param, options) => fetch({act: 'bizApply', param, options})

// 通过小程序code换取openid接口
export const code2Session = (param, options) => fetch({act: 'code2Session', param, options})

// 新增限时抢购
export const bizAddSpike = (param, options) => fetch({act: 'bizAddSpike', param, options})

// 限时抢购列表
export const bizSpikeList = (param, options) => fetch({act: 'bizSpikeList', param, options})

// 限时抢购列表
export const bizCancelSpike = (param, options) => fetch({act: 'bizSpikeList', param, options})

export const bizSpikeDetail = (param, options) => fetch({act: 'bizSpikeDetail', param, options})
