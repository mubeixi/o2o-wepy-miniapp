import apiBaseUrl from './env'
import  {createToken} from  './request'
export const toast = (title, icon, image, duration) => {
  wx.showToast({
    title,
    duration: duration || 2000,
    icon,
    image
  })
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
  if (!title) return
  if (title.length > 6) {
    // 显示所有的问题
    toast(title, 'none', '', duration)
  } else {
    toast(title, 'none', '/static/icon_http_error.png', duration)
  }
}

export const linkTo = (url, type = 'default') => {

  if (type === 'default') {
    wx.navigateTo({
      url,
      fail(err) {
        console.log(err)
        wx.switchTab({
          url
        })
      }
    })
  }
}



export const showLoading = (title, mask=false) => {
  wx.showLoading({
    title,
    mask
  })
}
export const hideLoading = () => {
  wx.hideLoading()
}




export const uploadByPromise = ({url, filePath, name = 'image', formData}) => {

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name,
      formData,
      success: (res) => {

        let {data = {}} = res
        if (typeof data === 'string' && data) {
          let body = JSON.parse(data)

          data = body.data
        }
        if (data.path) {
          resolve(data.path)
        } else {
          resolve(false)

          // let msg=JSON.parse(res.data);
          toast('文件上传失败')
        }

      },
      fail: (err) => {
        reject(err)
      },
      complete: (rt) => {
        console.log(rt)
      }
    })
  })

}

export const chooseImageByPromise = ({count = 1, sizeType = ['original', 'compressed']}) => {
  return new Promise((resolve, reject) => {

    wx.chooseImage({
      count,
      // #ifndef MP-TOUTIAO
      sizeType, //可以指定是原图还是压缩图，默认二者都有
      // #endif
      success(res) {
        resolve(res.tempFiles)
      },
      fail(e) {
        reject(false)
      },
      complete(){

      }
    })

  })
}
//上传图片
export const uploadImages = (imgs) => {
  let sum = 0;
  let arr = [];
  let that = this;

  let param = {act:'uploadFile'};
  param.Users_ID ='wkbq6nc2kc';
  param.env ='wx_lp';

  if(!param.hasOwnProperty('access_token')){
   // param.access_token = GET_ACCESS_TOKEN()
    param.access_token = 'yFc5E3Tb58WgdGEXFUedmG0qLYTt67Zf'
  }

  let data = createToken(param);

  let taskList = []
  for (let i = 0; i < imgs.length; i++) {


      console.log("imgs",imgs)
    let taskItem = uploadByPromise({
      url: apiBaseUrl + '/api/little_program/shopconfig.php',
      filePath: imgs[i],
      name: 'image',
      formData: data
    })
    taskList.push(taskItem)
  }


  return new Promise((resolve, reject) => {
    Promise.all(taskList).then((urls) => {
      console.log(urls)
      resolve(urls)
    }).catch((error) => {
      reject(false)
      wx.showModal({
        title:'文件批量上传失败',
        content:JSON.stringify(error)
      })
      console.log(error)
    })
  })

}
