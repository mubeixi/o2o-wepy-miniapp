import { fetch } from '../common/request'

// 编辑商品信息前需要获取的一些数据
export const getSystemProdConfig = (param, options) => fetch({ act: 'system_prod_config', param, options })

// 产品保存
export const systemOperateProd = (param, options) => fetch({ act: 'system_operate_prod', param, options })

// 商品详情
export const getProductDetail = (param, options) => fetch({ act: 'system_prod_detail', param, options })

// 产品删除
export const bizProdDel = (param, options) => fetch({ act: 'batch_setting', param, options })

// 获取商品列表
export const bizProdList = (param, options) => fetch({ act: 'bizProdList', param, options })
// 编辑赠品列表
export const opBizGift = (param, options) => fetch({ act: 'opBizGift', param, options })

// 获取赠品详情
export const getShopGiftInfo = (param, options) => fetch({ act: 'getShopGiftInfo', param, options })
// 删除赠品
export const delGift = (param, options) => fetch({ act: 'delGift', param, options })
// 获取物流模板
export const getShippingTemplate = (param, options) => fetch({ act: 'getShippingTemplate', param, options })

// 获取赠品列表
export const getShopGiftList = (param, options) => fetch({ act: 'getShopGiftList', param, options })

// 获取秒杀列表
export const bizFlashsaleList = (param, options) => fetch({ act: 'bizFlashsaleList', param, options })
// 添加和编辑秒杀
export const bizOperateFlashsale = (param, options) => fetch({ act: 'bizOperateFlashsale', param, options })

// 获取秒杀详情
export const bizFlashsaleDetail = (param, options) => fetch({ act: 'bizFlashsaleDetail', param, options })

// 修改秒杀活动（产品）状态
export const bizFlashsaleStatus = (param, options) => fetch({ act: 'bizFlashsaleStatus', param, options })

// 产品上架
export const bizProdUp = (param, options) => fetch({ act: 'batch_setting', param: { ...param, type: 2 }, options })

// 产品下架
export const bizProdDown = (param, options) => fetch({ act: 'batch_setting', param: { ...param, type: 1 }, options })

// 获取活动详情
export const getActiveInfo = (param, options) => fetch({
  act: 'getActiveInfo',
  param: { ...param, updown_sales: 'down' },
  options
})
// 添加/编辑活动
export const opActive = (param, options) => fetch({
  act: 'opActive',
  param: { ...param, updown_sales: 'down' },
  options
})

// 获取产品分类
export const getProductCategory = (param, options) => fetch({ act: 'pro_cate', param, options })

// 分享秒杀活动（产品）
export const flashsaleShare = (param, options) => fetch({ act: 'flashsaleShare', param, options })

// 分享限时抢购活动（产品）
export const spikeShare = (param, options) => fetch({ act: 'spikeShare', param, options })

// 获取商品海报
export const getProductSharePic = (param, options) => fetch({
  act: 'shareProduct',
  param,
  options
})

// 获取商品列表
export const getProdList = (param, options) => fetch({ act: 'get_prod', param, options })

// 大转盘开始
export const rotateBegin = (param, options) => fetch({ act: 'beginTurn', param, options })

// 获取中奖记录
export const getRotateRecord = (param, options) => fetch({ act: 'getPrizeRecord', param, options })

// 大转盘初始化
export const rotateInit = (param, options) => fetch({ act: 'initTurn', param, options })
