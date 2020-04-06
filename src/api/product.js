import { fetch } from '../common/request'

// 编辑商品信息前需要获取的一些数据
export const getSystemProdConfig = (param, options) => fetch({act: 'system_prod_config', param, options})

export const systemOperateProd = (param, options) => fetch({act: 'system_operate_prod', param, options})

export const getProductDetail = (param, options) => fetch({act: 'prod_detail', param, options})

export const getProductList = (param, options) => fetch({act: 'get_prod', param, options})

export const bizProdDel = (param, options) => fetch({act: 'bizProdDel', param, options})

export const bizProdList = (param, options) => fetch({act: 'bizProdList', param, options})
