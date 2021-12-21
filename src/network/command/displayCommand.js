import {instance_api, instance_command_test} from "../axios.js";

// 获取调水指令
export function transferCommand(params) {
  return instance_api({
    url: 'instruction.api',
    method: 'get',
    params
  })
}

// 获取调水指令_本地
export function transferCommand_loacl(params) {
  return instance_command_test({
    url: 'instruction.api',
    method: 'get',
    params
  })
}