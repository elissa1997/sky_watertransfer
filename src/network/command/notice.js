import {instance_api} from "../axios.js";

// 获取通知内容
export function noticeContent(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'preNotice.do',
    method: 'get',
    params
  })
}

// 发布通知
export function publish(params, data) {
  return instance_api({
    url: process.env.VUE_APP_API + 'preNotice.do',
    method: 'post',
    params,
    data
  })
}

// 收到通知
export function reciveNotice(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'preNotice.do',
    method: 'post',
    params,
    
  })
}