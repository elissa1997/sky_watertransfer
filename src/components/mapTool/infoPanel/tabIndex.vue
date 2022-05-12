<template>
  <div id="tabIndex" :class="{collapse: collapse}">
    <div class="toggle" @click="collapse = !collapse">
        <component :is="(collapse)?'icon-menu-unfold-one':'icon-menu-fold-one'" theme="outline" size="24" fill="#099e07" :strokeWidth="3"/>
    </div>

    <a-tabs v-model="activeKey" class="tabs">
      <a-tab-pane key="1" tab="年内调水信息">
        <transferInfo  v-if="activeKey === '1'" @openCommand="openCommand"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="测站实时信息">
        <realTimeStation v-if="activeKey === '2'"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="取水信息">
        <waterUser v-if="activeKey === '3'" @waterUserAllTable="waterUserAllTable" @openWaterUser="openWaterUser"/>
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
      collapse: false,
      activeKey: "1"
    }
  },
  methods: {
    waterUserAllTable(data) {
      this.$emit('waterUserAllTable',data);
    },

    openCommand(data) {
      this.$emit('openCommand',data)
    },

    openWaterUser(data) {
      this.$emit('openWaterUser',data)
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#tabIndex{

  @include animation_cubic-bezier;
  position: absolute;
  top: calc(10px + $introduceHeight + 10px);
  right: 10px;
  // padding: 10px;
  // width: 427px;
  width: 490px;
  height: 60vh;
  height: $infoPanelHeight;

  ::v-deep .ant-tabs-tab-active {
    color: $mainColor;
  }

  ::v-deep .ant-tabs-tab:hover {
    color: $mainColorHover;
  }

  ::v-deep .ant-tabs-ink-bar {
    background-color: $mainColor;
  }
}

.collapse {
  right: -495px !important;
}

.tabs {
  @include grossGlass;
  @include boxShadow;
  border-radius: 5px;

}

.toggle {
  @include grossGlass;
  @include boxShadow;
  padding: 5px;
  // border-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: absolute;
  left: -34px;
  top: calc(($infoPanelHeight - 34px) / 2);
  display: flex;
  align-items: center;
  ::v-deep .i-icon {
    margin-right: 0px;
  }
}
</style>