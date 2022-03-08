import {instance_api, instance_test_local} from "../axios.js";

// 获取巡查列表
export function inspectionList(params) {
  return instance_api({
    url: 'urge.do',
    method: 'get',
    params
  })
}

// 添加巡查情况
export function publish(params, data) {
  return instance_api({
    url: 'urge.do',
    method: 'post',
    params,
    data
  })
}