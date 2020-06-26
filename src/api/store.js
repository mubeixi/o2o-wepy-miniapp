import { fetch } from '../common/request'


// 商家激活码续费
export const codeActive = (param, options) => fetch({act: 'codeActive', param, options})
// 电子面单合作公司列表和详情
export const getCoopCompany = (param, options) => fetch({act: 'getCoopCompany', param, options})

// 获取支持的快递公司
export const getShippingCompany = (param, options) => fetch({act: 'getShippingCompany', param, options})

// 添加或编辑
export const opCoopCompany = (param, options) => fetch({act: 'opCoopCompany', param, options})

export const opBizStore = (param, options) => fetch({act: 'opBizStore', param, options})
// 获取商家门店列表
export const getStoreList = (param, options) => fetch({act: 'getStoreList', param, options})
// 获取平台提现方式
export const getWithdrawMethods = (param, options) => fetch({act: 'getWithdrawMethods', param, options})
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
// 申请提现（商家）/保证金退款
export const bizWithdrawApply = (param, options) => fetch({act: 'bizWithdrawApply', param, options})
// 获取提现记录列表/保证金退款列表
export const getWithdrawRecordList = (param, options) => fetch({act: 'get_withdraw_record_list', param, options})
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

// 添加商家自定义分类
export const addBizProdCate = (param, options) => fetch({act: 'addBizProdCate', param, options})

// 编辑商家自定义分类
export const editBizProdCate = (param, options) => fetch({act: 'editBizProdCate', param, options})

// 删除商家自定义分类
export const delBizProdCate = (param, options) => fetch({act: 'delBizProdCate', param, options})

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
// 获取商家入驻订单列表/充值记录
export const getOrderList = (param, options) => fetch({act: 'getOrderList', param, options})

// 获取自定义类别的详情
export const bizIndustryDetail = (param, options) => fetch({act: 'bizIndustryDetail', param, options})

// 提交入驻申请
export const bizApply = (param, options) => fetch({act: 'bizApply', param, options})

// 通过小程序code换取openid接口
export const code2Session = (param, options) => fetch({act: 'code2Session', param, options})

// 新增限时抢购
export const bizAddSpike = (param, options) => fetch({act: 'bizOperateSpike', param, options})

// 限时抢购列表
export const bizSpikeList = (param, options) => fetch({act: 'bizSpikeList', param, options})

// 限时抢购列表
export const bizCancelSpike = (param, options) => fetch({act: 'bizSpikeList', param, options})

// 获取限时抢购详情
export const bizSpikeDetail = (param, options) => fetch({act: 'bizSpikeDetail', param, options})

// 交易数据统计
export const getTradeStatistic = (param, options) => fetch({act: 'getTradeStatistic', param, options})

// 订单统计（数量、销售额）
export const system_order_count = (param, options) => fetch({act: 'system_order_count', param, options})

// 新老客户交易统计
export const getNewOldTradeStatistic = (param, options) => fetch({act: 'getNewOldTradeStatistic', param, options})

// 商品销售情况统计
export const systemProdSales = (param, options) => fetch({act: 'systemProdSales', param, options})

// 商家资金流水
export const bizMoneyRecord = (param, options) => fetch({act: 'bizMoneyRecord', param, options})

// 修改限时抢购状态
export const bizSpikeStatus = (param, options) => fetch({act: 'bizSpikeStatus', param, options})

// 秒杀活动统计
export const bizFlashsaleStatustic = (param, options) => fetch({act: 'bizFlashsaleStatustic', param, options})

// 获取分销微信二维码
export const getDistributeWxQrcode = (param, options) => fetch({act: 'get_distribute_wxqrcode', param, options})

// 获取海报模板
export const getPosterList = (param, options) => fetch({ act: 'getPosterList', param, options })

// 获取商家的分享码
export const getBizShare = (param, options) => fetch({ act: 'getBizShare', param, options })

// 获取商家相册列表
export const getAlbumList = (param, options) => fetch({ act: 'getAlbumList', param, options })
// 删除商家相册列表
export const delPhoto = (param, options) => fetch({ act: 'delPhoto', param, options })
// 删除商家相册分类
export const delAlbum = (param, options) => fetch({ act: 'delAlbum', param, options })

// 添加或编辑相册分类
export const opPhotoAlbum = (param, options) => fetch({ act: 'opPhotoAlbum', param, options })

// 添加或编辑相册分类
export const getPhotoList = (param, options) => fetch({ act: 'getPhotoList', param, options })
// 添加或编辑相册分类
export const movePhoto = (param, options) => fetch({ act: 'movePhoto', param, options })

// 添加或者编辑相册
export const opPhoto = (param, options) => fetch({ act: 'opPhoto', param, options })

// 获取商家收款码
export const bizPaySign = (param, options) => fetch({ act: 'bizPaySign', param, options })
