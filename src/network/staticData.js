import {instance_static} from "./axios";

export function getBaseJson(fileName) {
  return instance_static({
    url: 'json/'+fileName,
    method: 'get'
  })
}