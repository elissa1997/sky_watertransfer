<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" width="40vw">
      <!-- <addNotice v-if="modal.visible && modal.from === 'addNotice'" :modalData="modal.data" @close="close"/>
      <addSelfCheck v-if="modal.visible && modal.from === 'addSelfCheck'" :modalData="modal.data" @close="close"/> -->
      <addInspection v-if="modal.visible && modal.from === 'addInspection'" :modalData="modal.data" @close="close"/>
      <addExecute v-if="modal.visible && modal.from === 'addExecute'" :modalData="modal.data" @close="close"/>
      <addWaterVol v-if="modal.visible && modal.from === 'addWaterVol'" :modalData="modal.data.reg" :station="modal.data.station" :type="modal.data.type" @close="close"/>
      <addWaterVol v-if="modal.visible && modal.from === 'updateWaterVol'" :modalData="modal.data.reg" :station="modal.data.station" :type="modal.data.type" @close="close"/>

      <detailExecute v-if="modal.visible && modal.from === 'executeDetail'" :modalData="modal.data" />
      <replyExecute v-if="modal.visible && modal.from === 'replyExecute'" :modalData="modal.data" @close="close"/>
      <!-- 巡查详情 -->
      <detailInspection  v-if="modal.visible && modal.from === 'detailInspection'" :modalData="modal.data" />
       <!-- 巡查详情 -->
      <replyInspection  v-if="modal.visible && modal.from === 'replyInspection'" :modalData="modal.data" @close="close"/>
    </a-modal>
  </div>
</template>

<script>
// import addNotice from "@/components/command/modal/addNotice.vue";
// import addSelfCheck from "@/components/command/modal/addSelfCheck.vue";
import addInspection from "@/components/command/modal/addInspection.vue";
import addExecute from "@/components/command/modal/addExecute.vue";
import addWaterVol from "@/components/command/modal/addWaterVol.vue";
import detailExecute from "@/components/command/modal/detailExecute.vue";
import replyExecute from "@/components/command/modal/replyExecute.vue";
import detailInspection from "@/components/command/modal/detailInspection.vue";
import replyInspection from "@/components/command/modal/replyInspection.vue";

export default {
  name: "index",
  props: {
    modal: {
      type: Object,
      default: undefined
    }
  },
  components: {
    // addNotice,
    // addSelfCheck,
    addInspection,
    addExecute,
    replyExecute,
    addWaterVol,
    detailExecute,
    detailInspection,
    replyInspection,
  },
  data() {
    return {}
  },
  methods: {
    close(data) {
      this.$emit('close', data);
      // this.modal.visible = false;
    }
  },
  mounted() {},
  watch: {}
}
</script>