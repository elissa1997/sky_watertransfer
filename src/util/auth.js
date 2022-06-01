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
    let sessionId = "A460F22BCF07DCF6513C1471C3BD8FEB";
    Cookies.set("JSESSIONID", sessionId, { expires: 27 });
  }
}