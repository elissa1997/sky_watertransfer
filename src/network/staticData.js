import {instance_static} from "./axios";

// 静态json文件
export function baseJson(fileName) {
  return instance_static({
    url: 'json/'+fileName,
    method: 'get'
  })
}