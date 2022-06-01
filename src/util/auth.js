import store from '@/store/index.js';
import { userInfo } from "@/network/user.js";

export async function saveUserInfo() {
  await userInfo().then(res => {
    if (res.code === "1") {
      store.commit('user/setInfo', res.data)
    }
  })
}