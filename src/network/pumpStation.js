import {instance_api} from "./axios";

// 泵站/闸站列表
export function stationList(params) {
  return instance_api({
    url: 'indexZBController.api',
    method: 'get',
    params
  })
}