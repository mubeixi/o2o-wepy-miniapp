import { fetch } from '../common/request'

// 编辑商品信息前需要获取的一些数据
export const getSystemProdConfig = (param, options) => fetch({act: 'system_prod_config', param, options})

export const systemOperateProd = (param, options) => fetch({act: 'system_operate_prod', param, options})

export const getProductDetail = (param, options) => fetch({act: 'prod_detail', param, options})


export const bizProdDel = (param, options) => fetch({act: 'bizProdDel', param, options})

export const bizProdList = (param, options) => fetch({act: 'bizProdList', param, options})

//获取赠品列表
export const getShopGiftList = (param, options) => fetch({act: 'getShopGiftList', param, options})

//获取秒杀列表
export const bizFlashsaleList = (param, options) => fetch({act: 'bizFlashsaleList', param, options})
//添加和编辑秒杀
export const bizOperateFlashsale = (param, options) => fetch({act: 'bizOperateFlashsale', param, options})

//获取秒杀详情
export const bizFlashsaleDetail = (param, options) => fetch({act: 'bizFlashsaleDetail', param, options})


//修改秒杀活动（产品）状态
export const bizFlashsaleStatus = (param, options) => fetch({act: 'bizFlashsaleStatus', param, options})
