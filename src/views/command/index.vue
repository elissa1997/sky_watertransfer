<template>
  <div id="index">
    <steps :current="current" @changeDisplay="changeDisplay"/>
    <div class="content">
      <plan v-if="displayNum === 1" :regData="regData"/>
      <notice v-if="displayNum === 2" @addNotice="addNotice" :regData="regData" ref="notice"/>
      <!-- <selfCheck v-if="displayNum === 3" @addSelfCheck="addSelfCheck" :regData="regData" ref="selfCheck"/> -->
      <inspection v-if="displayNum === 3" @addInspection="addInspection" @replyInspection="replyInspection" :regData="regData" @detailInspection = "detailInspection" ref="inspection"/>
      <meeting v-if="displayNum === 4" :regData="regData" />
      <execute v-if="displayNum === 5" @addExecute="addExecute" @replyExecute="replyExecute" @executeDetail="executeDetail" :regData="regData" ref="execute"/>
      <reportWaterVol v-if="displayNum === 6 || displayNum === 7" @addWaterVol="addWaterVol" @updateWaterVol="updateWaterVol" :regData.sync="regData" ref="reportWaterVol"/>
    </div>
    <div class="stepControl"  v-if="$hasPermission(this.$userInfo.type, 'A')">
      <a-button type="primary" @click="nextStep" :disabled="current >= 7">
        <template v-if="current <= 5">确认执行下一步</template>
        <template v-if="current === 6 || current === 7 ">本次调水完成</template>
      </a-button>
    </div>

    <modal :modal="modal" @close="close"/>
  </div>
</template>

<script>

import { next } from "@/network/command/transferRecord.js"
import { Button } from 'ant-design-vue';
import steps from "@/components/command/steps.vue";
import plan from "@/views/command/plan.vue";
import notice from "@/views/command/notice.vue";
import selfCheck from "@/views/command/selfCheck.vue";
import inspection from "@/views/command/inspection.vue";
import meeting from "@/views/command/meeting.vue";
import execute from "@/views/command/execute.vue";
import reportWaterVol from "@/views/command/reportWaterVol.vue";

import modal from "@/components/command/modal/index.vue";

export default {
  name: "index",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {

    AButton:Button,
    steps,
    plan,
    notice,
    selfCheck,
    inspection,
    meeting,
    execute,
    reportWaterVol,

    modal
  },
  data() {
    return {
      stepStyle: {
        // marginBottom: '10px',
        boxShadow: '#0000001f 0px 7px 8px -8px',
      },
      current: undefined,
      displayNum: undefined,
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
      next(this.next_params_data.params, this.next_params_data.data).then(res => {
        if(res.code === "1"){
          this.current = this.current + 1;
          this.displayNum = this.current;
        }
      })
    },

    changeDisplay(num) {
      this.displayNum = num;
    },

    addNotice() {
      this.modal = {
        visible: true,
        title: "发布预通知",
        data: this.regData,
        from: "addNotice"
      }
    },

    addSelfCheck() {
      this.modal = {
        visible: true,
        title: "上报自检情况",
        data: this.regData,
        from: "addSelfCheck"
      }
    },

    addInspection() {
      this.modal = {
        visible: true,
        title: "添加巡查情况",
        data: this.regData,
        from: "addInspection"
      }
    },

    replyInspection(record) {
      this.modal = {
        visible: true,
        title: "巡查回复",
        data: record,
        from: "replyInspection"
      }
    },

    detailInspection(record) {
      this.modal = {
        visible: true,
        title: "巡查详情",
        data: record,
        from: "detailInspection"
      }
    },

    addExecute() {
      this.modal = {
        visible: true,
        title: "下达指令",
        data: this.regData,
        from: "addExecute"
      }
    },

    executeDetail(record) {
      this.modal = {
        visible: true,
        title: "指令详情",
        data: record,
        from: "executeDetail"
      }
    },
    replyExecute(record){
      this.modal = {
        visible: true,
        title: "调度指令单反馈",
        data: record,
        from: "replyExecute"
      }
    },
    addWaterVol(station) {
      this.modal = {
        visible: true,
        title: "水量上报",
        data: {reg:this.regData, station},
        from: "addWaterVol"
      }
    },

    updateWaterVol(record, station) {
      // console.log(record, station)
      this.modal = {
        visible: true,
        title: "水量上报修改",
        data: {reg:record, station, type: "update"},
        from: "updateWaterVol"
      }
    },

    close(data) {
      if (data.refresh) {
        this.$refs[data.refName].refreshByClose();
      }
      this.modal.visible = false;
    }



  },
  mounted() {
    this.current = Number(this.regData.status);
    this.displayNum = this.current;
  },
  computed: {
    next_params_data: function (params) {
      return {
        params: {
          action: "updateProgress"
        },

        data: {
          reg_cd: this.regData.reg_cd,
          status: this.displayNum + 1
        }
      }
    }
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