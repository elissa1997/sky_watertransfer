import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';
import '@/assets/public.scss';
import '@/assets/esri_reset.scss';
import '@/assets/ant_reset.scss';
import {install} from '@icon-park/vue/es/all';
import { initArcGisJs } from "@/util/loadGisModules";
Vue.config.productionTip = false
//加载需要异步查询的参数、数据 如：esri gis模块，将异步方法同步执行完后再初始化vue，
const initParamsStart = async () => {
  try {
    Vue.prototype.$arcgisModules = await initArcGisJs();
    Vue.prototype.$message = message;
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