import {instance_api} from "../axios.js";

// 上传会议记录
export function uploadMeeting(data,params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'meeting.do',
    method: 'post',
    data,
    params
  })
}

// 会议记录列表
export function listMeeting(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'meeting.do',
    method: 'get',
    params
  })
}

// 下级单位签收
export function reciveMeeting(params) {
  return instance_api({
    url: process.env.VUE_APP_API + 'meeting.do',
    method: 'post',
    params
  })
}