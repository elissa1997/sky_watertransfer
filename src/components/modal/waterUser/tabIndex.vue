<template>
  <div id="tabIndex">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="基础信息">
        <baseInfo :attributes="attributes" v-if="activeKey === '1'"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="水量统计">
        <waterStatistics :attributes="attributes" v-if="activeKey === '2'"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import baseInfo from "@/components/modal/waterUser/baseInfo.vue";
import waterStatistics from "@/components/modal/waterUser/waterStatistics.vue";
export default {
  name: "tabIndex",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    baseInfo,
    waterStatistics
  },
  data() {
    return {
      activeKey: "1"
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#tabIndex{
  
}
</style>