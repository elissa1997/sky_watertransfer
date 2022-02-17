import {instance_api, instance_test_local} from "../axios.js";

// 获取通知内容
export function noticeContent(params) {
  return instance_test_local({
    url: 'preNotice.api',
    method: 'get',
    params
  })
}

// 发布通知
export function publish(params, data) {
  return instance_test_local({
    url: 'preNotice.api',
    method: 'post',
    params,
    data
  })
}