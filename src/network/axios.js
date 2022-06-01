import axios from 'axios';
import { setDevSessionId } from "@/util/auth.js";

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
        setDevSessionId();
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