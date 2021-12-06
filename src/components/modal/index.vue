<template>
  <div id="modalIndex">
    <pumpStation v-if="from === 'businessLayer_02'"/>
    <gateStation v-if="from === 'businessLayer_03'"/>
    
  </div>
</template>

<script>
import pumpStation from "@/components/modal/pumpStation/tabIndex.vue"
import gateStation from "@/components/modal/gateStation/tabIndex.vue"

export default {
  name: "modalIndex",
  props: {
    from: {
      type: String,
      default: undefined,
    },
    data: {
      type: Object,
      default: undefined
    }
  },
  components: {
    pumpStation,
    gateStation
  }
}
</script>