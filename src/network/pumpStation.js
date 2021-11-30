import {instance_api} from "./axios";

// 泵站列表
export function pumpStationList(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}