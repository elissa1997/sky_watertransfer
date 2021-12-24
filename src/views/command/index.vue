<template>
  <div id="index">
    <steps :current="current" @changeDisplay="changeDisplay"/>

    <div class="content">
      <plan v-if="displayNum === 0"/>
      <notice v-if="displayNum === 1"/>
      <selfCheck v-if="displayNum === 2"/>
      <inspection v-if="displayNum === 3"/>
      <div v-if="displayNum === 4">工作会议</div>
      <div v-if="displayNum === 5">实施调水</div>
    </div>
    <div class="stepControl">
      <a-button type="primary" @click="nextStep" :disabled="current >= 5">确认执行下一步</a-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import steps from "@/components/command/steps.vue";
import plan from "@/views/command/plan.vue";
import notice from "@/views/command/notice.vue";
import selfCheck from "@/views/command/selfCheck.vue";
import inspection from "@/views/command/inspection.vue";

export default {
  name: "index",
  props: {
    transferStep: {
      type: Number,
      default: 2
    }
  },
  components: {

    AButton:Button,
    steps,
    plan,
    notice,
    selfCheck,
    inspection
  },
  data() {
    return {
      stepStyle: {
        // marginBottom: '10px',
        boxShadow: '#0000001f 0px 7px 8px -8px',
      },
      current: 0,
      displayNum: 0
    }
  },
  methods: {
    nextStep() {
      this.current = this.current + 1;
      this.displayNum = this.current;
    },

    changeDisplay(num) {
      this.displayNum = num;
    }
  },
  mounted() {
    this.current = this.transferStep;
    this.displayNum = this.current;
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#index{
  padding: 10px;
}

.content {
  margin-top: 15px;
  height: calc(90vh - 118px);
}

.stepControl {
  margin-top: 10px;
}
</style>