import {instance_api, instance_test_local} from "../axios.js";


// 获取接收单位下拉菜单内容
export function receiveUnit(params) {
  return instance_api({
    url: 'transferPlan.do',
    method: 'get',
    params
  })
}

// 获取联系人
export function contacts(params) {
  return instance_api({
    url: 'gateway/only.do',
    method: 'get',
    params
  })
}