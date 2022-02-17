import {instance_api, instance_upload_local, instance_test_local} from "../axios.js";

// 上传方案
export function uploadPlan(data,params) {
  return instance_upload_local({
    url: 'transferPlan.api',
    method: 'post',
    data,
    params
  })
}

// 方案列表
export function listPlan(params) {
  return instance_test_local({
    url: 'transferPlan.api',
    method: 'get',
    params
  })
}