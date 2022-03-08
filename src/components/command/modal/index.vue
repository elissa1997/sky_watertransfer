<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" width="40vw">
      <addNotice v-if="modal.visible && modal.from === 'addNotice'" :modalData="modal.data" @close="close"/>
      <addSelfCheck v-if="modal.visible && modal.from === 'addSelfCheck'" :modalData="modal.data" @close="close"/>
      <addInspection v-if="modal.visible && modal.from === 'addInspection'" :modalData="modal.data" @close="close"/>
      <addExecute v-if="modal.visible && modal.from === 'addExecute'" :modalData="modal.data" @close="close"/>
      <addWaterVol v-if="modal.visible && modal.from === 'addWaterVol'" :modalData="modal.data" @close="close"/>
      <addWaterVol v-if="modal.visible && modal.from === 'updateWaterVol'" :modalData="modal.data.reg" :record="modal.data.record" @close="close"/>

      <detailExecute  v-if="modal.visible && modal.from === 'executeDetail'" :modalData="modal.data" />
    </a-modal>
  </div>
</template>

<script>
import addNotice from "@/components/command/modal/addNotice.vue";
import addSelfCheck from "@/components/command/modal/addSelfCheck.vue";
import addInspection from "@/components/command/modal/addInspection.vue";
import addExecute from "@/components/command/modal/addExecute.vue";
import addWaterVol from "@/components/command/modal/addWaterVol.vue";
import detailExecute from "@/components/command/modal/detailExecute.vue";

export default {
  name: "index",
  props: {
    modal: {
      type: Object,
      default: undefined
    }
  },
  components: {
    addNotice,
    addSelfCheck,
    addInspection,
    addExecute,
    addWaterVol,
    detailExecute
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
<style lang="scss" scoped>
#modalIndex{}
</style>