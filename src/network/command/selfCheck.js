import {instance_api, instance_test_local} from "../axios.js";

// 获取通知内容
export function selfCheckList(params) {
  return instance_api({
    url: 'selfCheck.do',
    method: 'get',
    params
  })
}

// 上报自检情况
export function publish(params, data) {
  return instance_api({
    url: 'selfCheck.do',
    method: 'post',
    params,
    data
  })
}
