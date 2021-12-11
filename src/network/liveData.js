import {instance_api} from "./axios";

// 泵站/闸站 相关接口
export function transferApi(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}

// 取水户相关接口
export function waterUserApi(params) {
  return instance_api({
    url: 'ddMapArcGis.api',
    method: 'get',
    params
  })
}
