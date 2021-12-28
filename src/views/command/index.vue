<template>
  <div id="index">
    <steps :current="current" @changeDisplay="changeDisplay"/>

    <div class="content">
      <plan v-if="displayNum === 0"/>
      <notice v-if="displayNum === 1" @addNotice="addNotice"/>
      <selfCheck v-if="displayNum === 2" @addSelfCheck="addSelfCheck"/>
      <inspection v-if="displayNum === 3" @addInspection="addInspection"/>
      <div v-if="displayNum === 4">工作会议</div>
      <execute v-if="displayNum === 5" @addCommand="addCommand"/>
    </div>
    <div class="stepControl">
      <a-button type="primary" @click="nextStep" :disabled="current >= 5">确认执行下一步</a-button>
    </div>

    <modal :modal="modal"/>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import steps from "@/components/command/steps.vue";
import plan from "@/views/command/plan.vue";
import notice from "@/views/command/notice.vue";
import selfCheck from "@/views/command/selfCheck.vue";
import inspection from "@/views/command/inspection.vue";
import execute from "@/views/command/execute.vue";

import modal from "@/components/command/modal/index.vue";

export default {
  name: "index",
  props: {
    transferStep: {
      type: Number,
      default: 5
    }
  },
  components: {

    AButton:Button,
    steps,
    plan,
    notice,
    selfCheck,
    inspection,
    execute,

    modal
  },
  data() {
    return {
      stepStyle: {
        // marginBottom: '10px',
        boxShadow: '#0000001f 0px 7px 8px -8px',
      },
      current: 0,
      displayNum: 0,
      modal: {
        visible: false,
        title: undefined,
        data: undefined,
        from: undefined
      }
    }
  },
  methods: {
    nextStep() {
      this.current = this.current + 1;
      this.displayNum = this.current;
    },

    changeDisplay(num) {
      this.displayNum = num;
    },

    addNotice() {
      this.modal = {
        visible: true,
        title: "发布预通知",
        data: undefined,
        from: "addNotice"
      }
    },

    addSelfCheck() {
      this.modal = {
        visible: true,
        title: "上报自检情况",
        data: undefined,
        from: "addSelfCheck"
      }
    },

    addInspection() {
      this.modal = {
        visible: true,
        title: "添加巡查情况",
        data: undefined,
        from: "addInspection"
      }
    },

    addCommand() {
      this.modal = {
        visible: true,
        title: "下达指令",
        data: undefined,
        from: "addCommand"
      }
    },





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