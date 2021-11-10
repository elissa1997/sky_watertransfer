import axios from 'axios';

// 访问接口
export function instance_live(config) {
    const instance = axios.create({
        baseURL: '/ahjs/',
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