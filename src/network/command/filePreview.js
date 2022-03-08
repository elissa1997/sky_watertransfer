import {instance_api} from "../axios.js";

export function filePreview(params) {
  return instance_api({
    url: 'gateway/only.do',
    method: 'get',
    params
  })
}