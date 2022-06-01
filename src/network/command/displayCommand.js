import {instance_api} from "../axios.js";

// 获取调水指令
export function transferCommand(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'instruction.do',
    method: 'get',
    params
  })
}
