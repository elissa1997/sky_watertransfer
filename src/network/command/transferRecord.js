import {instance_api} from "../axios.js";

// 获取调水记录列表
export function transferRecordList(params) {
  return instance_api({
    url: 'gateway/only.api',
    method: 'get',
    params
  })
}

export function transferRecordDetail(params) {
  return instance_api({
    url: 'gateway/only.api',
    method: 'get',
    params
  })
}