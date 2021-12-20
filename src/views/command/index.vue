<template>
  <div id="index">
    <a-steps :current="status" @change="changeStep">
      <a-step title="调水方案" />
      <a-step title="调水预通知" />
      <a-step title="自检上报" />
      <a-step title="调水巡查" />
      <a-step title="工作会议" />
      <a-step title="实施调水"  />
    </a-steps>

    <div class="content">
      <plan v-if="status === 0"/>
      <notice v-if="status === 1"/>
      <selfCheck v-if="status === 2"/>
      <inspection v-if="status === 3"/>

    </div>
    <div class="stepControl">
      <a-button type="primary" @click="nextStep" :disabled="status >= 5">确认执行下一步</a-button>
    </div>
  </div>
</template>

<script>
import { Steps, Button } from 'ant-design-vue';
import plan from "@/views/command/plan.vue";
import notice from "@/views/command/notice.vue";
import selfCheck from "@/views/command/selfCheck.vue";
import inspection from "@/views/command/inspection.vue";

export default {
  name: "index",
  props: {
    transferStep: {
      type: Number,
      default: 3
    }
  },
  components: {
    ASteps:Steps,
    AStep:Steps.Step,
    AButton:Button,

    plan,
    notice,
    selfCheck,
    inspection
  },
  data() {
    return {
      status: 0
    }
  },
  methods: {
    nextStep() {
      this.status = this.status + 1;
    },
    changeStep(status) {
      this.status = status;
    },
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
  margin-top: 10px;
  height: calc(90vh - 118px);
}

.stepControl {
  margin-top: 10px;
}
</style>