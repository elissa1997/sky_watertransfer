import {instance_api, instance_test_local} from "../axios.js";

// 获取调水指令
export function transferCommand(params) {
  return instance_api({
    url: 'instruction.do',
    method: 'get',
    params
  })
}
