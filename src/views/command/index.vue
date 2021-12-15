<template>
  <div id="index">
    <a-steps :current="status">
      <a-step title="调水方案" />
      <a-step title="调水预通知" />
      <a-step title="自检上报" />
      <a-step title="调水巡查" />
      <a-step title="工作会议" />
      <a-step title="实施调水" />
    </a-steps>

    <div class="content"></div>
    <div class="stepControl">
      <a-button type="primary" @click="nextStep" :disabled="status >= 5">确认执行下一步</a-button>
    </div>
  </div>
</template>

<script>
import { Steps, Button } from 'ant-design-vue';

export default {
  name: "index",
  props: {},
  components: {
    ASteps:Steps,
    AStep:Steps.Step,
    AButton:Button
  },
  data() {
    return {
      status: 0
    }
  },
  methods: {
    nextStep() {
      this.status = this.status + 1;
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#index{
  padding: 10px;
}

.content {
  height: calc(90vh - 108px);
}

.stepControl {
  margin-top: 10px;
}
</style>