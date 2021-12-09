import {instance_api} from "./axios";

// 泵站/闸站列表
export function transferApi(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}

// 获取泵站/闸站 水位详情
export function stationWaterLevDetail(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}

// 获取闸站闸门开度历史数据
export function stationGateHList(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}