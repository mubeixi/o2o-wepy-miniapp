import { fetch } from '../common/request'

export const bizIndustryList = (param, options) => fetch({act: 'bizIndustryList', param, options})
