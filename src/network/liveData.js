import {instance_api} from "./axios";

// 泵站/闸站 相关接口
export function transferApi(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'indexZBController.api',
    method: 'get',
    params
  })
}

// 取水户相关接口
export function waterUserApi(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'ddMapArcGis.api',
    method: 'get',
    params
  })
}