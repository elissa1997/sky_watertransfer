<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" :width="800" centered>
      <pumpStation v-if="modal.visible && modal.from === 'businessLayer_02'" :attributes="modal.data"/>
      <gateStation v-if="modal.visible && modal.from === 'businessLayer_03'" :attributes="modal.data"/>
      <pdfView v-if="modal.visible && modal.from === 'projectPlan'" :src="modal.data"/>
      <waterUserAllTable v-if="modal.visible && modal.from === 'waterUserAllTable'" :cods="modal.data"/>
    </a-modal>
  </div>
</template>

<script>
import pdfView from "@/components/public/pdfView.vue";
import pumpStation from "@/components/modal/pumpStation/tabIndex.vue";
import gateStation from "@/components/modal/gateStation/tabIndex.vue";
import waterUserAllTable from "@/components/modal/waterUserAllTable.vue";

export default {
  name: "modalIndex",
  props: {
    modal: {
      type: Object,
      default: undefined
    }
  },
  components: {
    pdfView,
    pumpStation,
    gateStation,
    waterUserAllTable
  },
  methods: {

  },
  mounted() {

  }
}
</script>