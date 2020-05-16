/**
 * 地理位置类
 *
 */

import { isWeiXin } from '../tool'
import { WX_JSSDK_INIT } from '../mixin'
import permision from '../permission'

const failOpt = {
    'osNotAllow': {code: 2001, msg: '无获取位置权限'},
    'codeError': {code: 3001, msg: '代码执行错误'},
    'browerNotAllow': {code: 2002, msg: 'Geolocation is not supported by this browser'},
    'notFound': {code: -1, msg: '获取位置失败'}
}


const checkLocationPermission = async () => {
    let status = permision.isIOS ? await permision.requestIOS('location') : await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
    if (status === null || status === 1) {
        status = 1;
    } else {
        uni.showModal({
            content: "需要定位权限",
            confirmText: "设置",
            success: function (res) {
                if (res.confirm) {
                    permision.gotoAppSetting();
                }
            }
        })
    }
    return status;
}

export const getLocation = async (vm) => {

    // #ifdef APP-PLUS
    let checkPermission = await checkLocationPermission();
    // #endif

    return new Promise((resolve, reject) => {

        try {
            // #ifdef APP-PLUS
            //判断iOS上是否给予位置权限，有权限返回true，否则返回false
            // if(plus.os.name == 'Android' && !permission.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')){
            //     reject(failOpt.osNotAllow)
            // }
            // if(plus.os.name == 'iOS' && !permission.judgeIosPermission('location')){
            //     reject(failOpt.osNotAllow)
            // }
            if (!checkPermission) {
                reject(failOpt.osNotAllow)
            }

            // #endif


            // #ifdef H5
            if (isWeiXin()) {
                WX_JSSDK_INIT(vm).then(ret => {

                    console.log('签名成功')
                    ret.getLocation({
                        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: res => {
                            console.log(2222222222222222, res)
                            resolve({code: 0, data: {latitude: res.latitude, longitude: res.longitude}})
                        },
                        fail: err => {
                            console.log(333333333333, err)
                            reject(failOpt.notFound)
                        }
                    });

                })

            } else {

                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                        let res = position.coords
                        resolve({code: 0, data: {latitude: res.latitude, longitude: res.longitude}})

                    }, function (error) {

                        let msg = ''
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                msg = "User denied the request for Geolocation."
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "Location information is unavailable."
                                break;
                            case error.TIMEOUT:
                                msg = "The request to get user location timed out."
                                break;
                            case error.UNKNOWN_ERROR:
                                msg = "An unknown error occurred."
                                break;
                        }

                        reject({code: 2003, msg: msg})

                    });
                } else {
                    reject(failOpt.browerNotAllow)
                }

            }

            // #endif

            // #ifndef H5
            uni.getLocation({
                type: 'gcj02',
                success: res => {
                    resolve({code: 0, data: {latitude: res.latitude, longitude: res.longitude}})
                },
                fail: err => {
                    reject(failOpt.notFound)
                }
            })
            // #endif

        } catch (e) {
            reject({code: -1, msg: '程序错误:' + e.message})
        }
    })
}

export class LocationClass {

    // latitude = null
    // longitude = null
    getLocation


}


