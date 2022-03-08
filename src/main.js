import Vue from 'vue';
import App from './App.vue';
import router from './router';
import dayjs from "dayjs"
import * as echarts from 'echarts';

import { message } from 'ant-design-vue';
import '@/assets/public.scss';
import '@/assets/esri_reset.scss';
import '@/assets/ant_reset.scss';
import {install} from '@icon-park/vue/es/all';
import { initArcGisJs } from "@/util/loadGisModules";
import '@/util/drag.js';
// Vue.directive('drag',  drag);

import { checkToken } from "@/util/checkToken.js";
import { saveUserInfo } from "@/util/saveUserInfo.js";

Vue.config.productionTip = false
//加载需要异步查询的参数、数据 如：esri gis模块，将异步方法同步执行完后再初始化vue，
const initParamsStart = async () => {
  try {
    // checkToken("token");
    Vue.prototype.$env = process.env.NODE_ENV
    Vue.prototype.$arcgisModules = await initArcGisJs();
    Vue.prototype.$message = message;
    Vue.prototype.$dayjs = dayjs;
    Vue.prototype.$echarts = echarts;
    Vue.prototype.$userInfo = await saveUserInfo();
    
    Vue.config.devtools = true;
  } catch (error) {
    console.log(error);
  }
  // Vue.use(Antd);
  install(Vue);
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

initParamsStart()