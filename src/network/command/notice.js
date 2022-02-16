import {instance_api, instance_upload_local} from "../axios.js";

// 获取通知内容
export function noticeContent(params) {
  return instance_upload_local({
    url: 'preNotice.api',
    method: 'get',
    params
  })
}