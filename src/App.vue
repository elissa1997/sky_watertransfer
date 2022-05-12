<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <headerBar v-if="$route.meta.headerDisplay"/>

    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN.js';
import headerBar from "@/views/header.vue";

export default {
  name: "app",
  components: {
    AConfigProvider:ConfigProvider,
    headerBar
  },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="scss">

</style>
