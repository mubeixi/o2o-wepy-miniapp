import { fetch } from '../common/request'

// 编辑商品信息前需要获取的一些数据
export const getSystemProdConfig = (param, options) => fetch({act: 'system_prod_config', param, options})
