<template>
  <div id="tabIndex">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="年内调水信息">
        <transferInfo  v-if="activeKey === '1'" @openCommand="openCommand"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="测站实时信息">
        <realTimeStation v-if="activeKey === '2'"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="取水信息">
        <waterUser v-if="activeKey === '3'" @waterUserAllTable="waterUserAllTable"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import transferInfo from "@/components/mapTool/infoPanel/transferInfo.vue";
import realTimeStation from "@/components/mapTool/infoPanel/realTimeStation.vue";
import waterUser from "@/components/mapTool/infoPanel/waterUser.vue";

export default {
  name: "tabIndex",
  props: {},
  components: {
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    transferInfo,
    realTimeStation,
    waterUser
  },
  data() {
    return {
      activeKey: "1"
    }
  },
  methods: {
    waterUserAllTable(data) {
      this.$emit('waterUserAllTable',data);
    },

    openCommand(data) {
      this.$emit('openCommand',data)
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#tabIndex{
  @include grossGlass;
  @include boxShadow;
  @include animation_cubic-bezier;
  position: absolute;
  top: 110px;
  right: 10px;
  // padding: 10px;
  border-radius: 5px;
  // width: 427px;
  width: 490px;
  height: 60vh;
}
</style>