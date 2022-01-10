<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" :width="width" destroyOnClose centered v-drag-modal>
      <pumpStation v-if="modal.visible && modal.from === 'businessLayer_02'" :attributes="modal.data"/>
      <gateStation v-if="modal.visible && modal.from === 'businessLayer_03'" :attributes="modal.data"/>
      <pdfView v-if="modal.visible && modal.from === 'projectPlan'" :src="modal.data"/>
      <waterUserAllTable v-if="modal.visible && modal.from === 'waterUserAllTable'" :cods="modal.data"/>
      <videoIframe v-if="modal.visible && modal.from === 'businessLayer_08'" :attributes="modal.data"/>
      <waterUser v-if="modal.visible && modal.from === 'waterUser'" :attributes="modal.data"/>
      <command v-if="modal.visible && modal.from === 'transferCommand'"/>
    </a-modal>
  </div>
</template>

<script>
import pdfView from "@/components/public/pdfView.vue";
import pumpStation from "@/components/modal/pumpStation/tabIndex.vue";
import gateStation from "@/components/modal/gateStation/tabIndex.vue";
import waterUserAllTable from "@/components/modal/waterUserAllTable.vue";
import videoIframe from "@/components/modal/videoIframe.vue";
import waterUser from "@/components/modal/waterUser/tabIndex.vue";
import command from "@/views/command/index.vue";

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
    waterUserAllTable,
    videoIframe,
    waterUser,
    command
  },
  data() {
    return {
      width: 400,
      modalWidthByFrom: {
        full: ["transferCommand"],
        large: ["businessLayer_08", "projectPlan"],
        medium: ["businessLayer_02", "businessLayer_03", "waterUserAllTable", "waterUser"],
        small: []
      }
    }
  },
  methods: {
    getWidth() {
      for (const key in this.modalWidthByFrom) {
        const element = this.modalWidthByFrom[key];
        if (element.includes(this.modal.from)) {
          switch (key) {
            case "full":
            this.width = "calc(98vw - 77px)";
            break;

            case "large":
            this.width = 1300;
            break;

            case "medium":
            this.width = 800;
            break;

            case "small":
            this.width = 500;
            break;

            default:
              break;
          }
        }
      }
    }
  },
  mounted() {
    },
  watch: {
    modal: {
      handler (){
        this.getWidth();
      },
      deep: true,
      immediate: true
    }
  }
}
</script>