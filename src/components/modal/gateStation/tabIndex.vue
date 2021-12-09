<template>
  <div class="tabIndex">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="实时水位">
        <liveWaterLevel v-if="activeKey === '1'" :attributes="attributes"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="闸门启闭" force-render>
        <gateStatus v-if="activeKey === '2'" :attributes="attributes"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="水量统计">
        <waterStatistics v-if="activeKey === '3'" :attributes="attributes"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import liveWaterLevel from "@/components/modal/gateStation/liveWaterLevel.vue";
import gateStatus from "@/components/modal/gateStation/gateStatus.vue";
import waterStatistics from "@/components/modal/gateStation/waterStatistics.vue";

import { Tabs } from 'ant-design-vue';

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

    liveWaterLevel,
    gateStatus,
    waterStatistics
  },
  data() {
    return {
      activeKey: "1"
    }
  } 
}
</script>