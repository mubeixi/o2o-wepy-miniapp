export default class DiyForm {
  type = ''
  title =''
  label = ''
  desc =''
  require =''
  value = ''
  constructor({type, title, label, desc, require, value}) {
    this.type = type
    this.title = title
    this.label = label
    this.desc = desc
    this.require = require
    this.value = value
  }
}

export const eleTypeList = [
  {title: '文本框', type: 'input'},
  {title: '选择框', type: 'picker'},
  {title: '图片上传', type: 'img'},
  {title: '地区选择', type: 'area'}
]
