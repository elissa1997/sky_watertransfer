import {instance_api, instance_command_test} from "../axios.js";

// 获取调水指令
export function transferCommand(params) {
  return instance_api({
    url: 'instruction.api',
    method: 'get',
    params
  })
}
