import {instance_api, instance_test_local} from "../axios.js";

// 获取通知内容
export function noticeContent(params) {
  return instance_api({
    url: 'preNotice.do',
    method: 'get',
    params
  })
}

// 发布通知
export function publish(params, data) {
  return instance_api({
    url: 'preNotice.do',
    method: 'post',
    params,
    data
  })
}

// 收到通知
export function reciveNotice(params) {
  return instance_api({
    url: 'preNotice.do',
    method: 'post',
    params,
    
  })
}