import store from '@/store/index.js';
import Cookies from 'js-cookie'
import { userInfo } from "@/network/user.js";

export async function saveUserInfo() {
  await userInfo().then(res => {
    if (res.code === "1") {
      store.commit('user/setInfo', res.data)
    }
  })
}

export function setDevSessionId() {
  if(process.env.NODE_ENV === "development"){
    let sessionId = "F7E4F4CB441D5A46D24AADAA7D76265B";
    Cookies.set("JSESSIONID", sessionId, { expires: 27 });
  }
}