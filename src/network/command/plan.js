import {instance_api, instance_upload_local, instance_test_local} from "../axios.js";

// 上传方案
export function uploadPlan(data,params) {
  return instance_api({
    url: 'transferPlan.do',
    method: 'post',
    data,
    params
  })
}

// 方案列表
export function listPlan(params) {
  return instance_api({
    url: 'transferPlan.do',
    method: 'get',
    params
  })
}

// 下级单位签收
export function recivePlan(params) {
  return instance_api({
    url: 'transferPlan.do',
    method: 'post',
    params
  })
}