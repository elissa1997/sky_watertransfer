import {instance_api, instance_test_local} from "./axios.js";

// 获取通知内容
export function userInfo() {
  return instance_api({
    url: 'gateway/only.do',
    method: 'get',
    params: { action: "getUser" }
  })
}