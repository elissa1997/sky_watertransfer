import {instance_api} from "../axios.js";

// 获取通知内容
export function selfCheckList(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'selfCheck.do',
    method: 'get',
    params
  })
}

// 上报自检情况
export function publish(params, data) {
  return instance_api({
    url: process.env.VUE_APP_API + 'selfCheck.do',
    method: 'post',
    params,
    data
  })
}
