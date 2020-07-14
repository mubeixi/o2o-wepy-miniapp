import { fetch } from '../common/request'

//  获取订单物流追踪
export const getOrderExpress = (param, options) => fetch({ act: 'get_order_express', param, options })
// 收取退款退货申请
export const getBackOrderNum = (param, options) => fetch({ act: 'getBackOrderNum', param, options })
// 收取退款退货申请
export const systemReceiptRefundProd = (param, options) => fetch({ act: 'system_receipt_refund_prod', param, options })
// 驳回退款退货申请
export const systemRefuseApply = (param, options) => fetch({ act: 'system_refuse_apply', param, options })
// 同意退款退货申请
export const systemConfirmApply = (param, options) => fetch({ act: 'system_confirm_apply', param, options })
// 获取退款单详情
export const getBackOrderDetail = (param, options) => fetch({ act: 'get_back_order_detail', param, options })
// 获取退款单列表
export const getBackOrder = (param, options) => fetch({ act: 'get_back_order', param, options })
// 订单列表
export const getOrder = (param, options) => fetch({ act: 'get_order', param, options })

// 拒单
export const systemRejectOrder = (param, options) => fetch({ act: 'system_reject_order', param, options })

// 订单详情
export const getOrderDetail = (param, options) => fetch({ act: 'get_order_detail', param, options })

// 获取合作公司
export const getAvailableCityExpress = (param, options) => fetch({ act: 'getAvailableCityExpress', param, options })

// 获取合作公司
export const systemSendOrder = (param, options) => fetch({ act: 'system_send_order', param, options })

// 获取商品下单模板详情或者列表
export const getBizOrderTemplateList = (param, options) => fetch({ act: 'getBizOrderTemplateList', param, options })

// 删除下单模板
export const delBizOrderTemplate = (param, options) => fetch({ act: 'delBizOrderTemplate', param, options })

// 添加编辑下单模板
export const opBizOrderTemplate = (param, options) => fetch({ act: 'opBizOrderTemplate', param, options })

export const checkOrderByCode = (param, options) => fetch({ act: 'system_consumption_order', param, options })

// 获取结算单列表和详情
export const getSettle = (param, options) => fetch({ act: 'getSettle', param, options })

// 申请结算
export const opBizSettle = (param, options) => fetch({ act: 'opBizSettle', param, options })

// 处理结算单
export const dealBizSettle = (param, options) => fetch({ act: 'dealBizSettle', param, options })

// 订单状态角标数

export const getOrderNum = (param, options) => fetch({ act: 'get_order_num', param, options })

// 查询同城订单是否可取消、取消原因列表
export const cityExpressCancelReason = (param, options) => fetch({ act: 'cityExpressCancelReason', param, options })

// 接收达达投递异常返回的订单产品
export const dadaExceptionOrderReceive = (param, options) => fetch({ act: 'dadaExceptionOrderReceive', param, options })

// 商家主动取消订单
export const cityExpressOrderReject = (param, options) => fetch({ act: 'cityExpressOrderReject', param, options })
