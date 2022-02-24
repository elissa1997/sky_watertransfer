import { userInfo } from "@/network/user.js";

export async function saveUserInfo() {
  let userData = undefined;
  await userInfo().then(res => {
    if (res.code === "1") {
      userData = res.data;
    }
  })

  return userData;
}