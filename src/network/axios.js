import axios from 'axios';
import Cookies from 'js-cookie'


// 访问接口
export function instance_api(config) {
    let url = undefined;

    if(process.env.NODE_ENV === "development"){
      url = '/local/'
    }

    if (process.env.NODE_ENV === "production") {
      url = '/ahjs/'
    }
    const instance = axios.create({
        baseURL: url,
        timeout: 8000,
        headers: { 'Content-Type':'application/json'}
    })


    instance.interceptors.request.use(config => {
        if(process.env.NODE_ENV === "development"){
            let sessionId = "F7E4F4CB441D5A46D24AADAA7D76265B";
            Cookies.set("JSESSIONID", sessionId, { expires: 27 });
        }
        return config
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err);
    })


    return instance(config)
}

// 上传文件接口
export function instance_upload(config) {
    let url = undefined;

    if(process.env.NODE_ENV === "development"){
      url = '/local/'
    }

    if (process.env.NODE_ENV === "production") {
      url = '/ahjs/'
    }

    const instance = axios.create({
        baseURL: url,
        timeout: 8000,
        headers: {'Content-Type':'multipart/form-data'}
    })


    instance.interceptors.request.use(config => {
        return config
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err);
    })


    return instance(config)
}


// 访问静态资源
export function instance_static(config) {
    const instance = axios.create({
        baseURL: '/dist/',
        timeout: 8000,
        headers: {'Content-Type':'application/json'}
    })


    instance.interceptors.request.use(config => {
        return config
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err);
    })


    return instance(config)
}