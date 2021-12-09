<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" :width="800" centered>
      <pumpStation v-if="modal.visible && modal.from === 'businessLayer_02'" :attributes="modal.data"/>
      <gateStation v-if="modal.visible && modal.from === 'businessLayer_03'" :attributes="modal.data"/>
    </a-modal>
  </div>
</template>

<script>
import pumpStation from "@/components/modal/pumpStation/tabIndex.vue"
import gateStation from "@/components/modal/gateStation/tabIndex.vue"

export default {
  name: "modalIndex",
  props: {
    modal: {
      type: Object,
      default: undefined
    }
  },
  components: {
    pumpStation,
    gateStation
  },
  methods: {

  },
  mounted() {

  }
}
</script>