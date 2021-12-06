<template>
  <div class="tabIndex">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="实时水位">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="设备详情" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="水量统计">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';

export default {
  name: "tabIndex",
  components: {
    ATabs:Tabs,
    ATabPane:Tabs.TabPane
  },
  data() {
    return {
      activeKey: "1"
    }
  } 
}
</script>