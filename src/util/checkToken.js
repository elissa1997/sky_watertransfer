import Cookies from 'js-cookie'

// 通过url参数读取token
export function getTokenByUrl(name) {
  
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if(window.location.hash.indexOf("?") < 0){
          return null;
  }
  let r = window.location.hash.split("?")[1].match(reg);
  if (r != null) {return decodeURIComponent(r[2]);}
  return undefined;
}

// 通过本地Cookie参数读取token
export function getTokenByCookie(name) {
  let token = undefined;
  token = Cookies.get(name);
  return token;
}

// 检查token是否存在
export function checkToken(name) {
  let urlToken = getTokenByUrl(name);
  let cookieToken = getTokenByCookie(name);
  if (urlToken) {
    // url中存在token，存入/更新cookie
    Cookies.set(name, urlToken, { expires: 27 });
    console.log(urlToken);
  }else{
    // url中不存在token，尝试读取cookie中token
    if (cookieToken) {
      // cookie中存在tookie，返回
      console.log(cookieToken);
    }else{
      // url 与 cookie 中均不存在token，跳CAS
      console.log("跳转CAS");
      // window.location.href="/url"
    }
  }
}
