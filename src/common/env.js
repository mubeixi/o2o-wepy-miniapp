// 测试appid   wx3d24c565489e305b https://newo2o.bafangka.com
// 正式商户id   wxfcabc14aef501fdd   正式域名https://newo2o.netcnnet.net


// const users_id = 'wkbq6nc2kc'
// 及贝商家
// wxb627a9dde54f65f6
const buildVersion = 110

const spaceImg = 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg'

const confByDev = {
  apiBaseUrl: 'https://newo2o.bafangka.com',
  staticUrl: 'https://newo2o.bafangka.com',
  buildVersion,
  spaceImg,
  IM_WSS_URL: 'wss://newjdtravel.bafangka.com/cus/',
  IM_API_URL: 'https://chat.bafangka.com',
  bussiBottom: '真产品聚划算就在网中网',
  isJb: false // 判断是否是及贝 用于区分logo
}

const confByPro = {
  apiBaseUrl: 'https://newo2o.netcnnet.net',
  staticUrl: 'https://newo2o.netcnnet.net',
  buildVersion,
  spaceImg,
  IM_WSS_URL: 'wss://newjdtravel.bafangka.com/cus/',
  IM_API_URL: 'https://chat.bafangka.com',
  bussiBottom: '真产品聚划算就在网中网',
  isJb: false// 判断是否是及贝 用于区分logo
}

const confByJb = {
  apiBaseUrl: 'https://jb.jbaycloud.com',
  staticUrl: 'https://jb.jbaycloud.com',
  buildVersion,
  spaceImg,
  IM_WSS_URL: 'wss://newjdtravel.bafangka.com/cus/',
  IM_API_URL: 'https://chat.bafangka.com',
  bussiBottom: '专业商家自营配送小程序',
  isJb: true// 判断是否是及贝 用于区分logo
}

export default confByDev

// export default confByPro
 // export default confByJb
