import {instance_api} from "../axios.js";

export function filePreview(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'gateway/only.do',
    method: 'get',
    params
  })
}