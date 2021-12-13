import {instance_command_test} from "../axios.js";

// 获取调水记录列表
export function transferRecordList(params) {
  return instance_command_test({
    url: 'gateway/only.api',
    method: 'get',
    params
  })
}