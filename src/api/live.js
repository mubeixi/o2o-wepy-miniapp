import { fetch } from '@/common/request'

export const applyLive = (param, options) => fetch({act: 'applyLive', param, options})

export const getLiveApplyStatus = (param, options) => fetch({act: 'getLiveApplyStatus', param, options})

export const delLiveApply = (param, options) => fetch({act: 'delLiveApply', param, options})

export const getLiveQrcode = (param, options) => fetch({act: 'getLiveQrcode', param, options})
