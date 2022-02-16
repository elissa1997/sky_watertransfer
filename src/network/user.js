import {instance_api, instance_upload_local} from "./axios.js";

// 获取通知内容
export function userInfo() {
  return instance_upload_local({
    url: 'gateway/only.api',
    method: 'get',
    params: { action: "getUser" }
  })
}