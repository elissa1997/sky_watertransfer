import {instance_api} from "./axios";

// 静态json文件
export function baseJson(fileName) {
  return instance_api({
    url: process.env.VUE_APP_DIST + 'json/'+fileName,
    method: 'get'
  })
}