<template>
  <div id="modalIndex">
    <a-modal v-model="modal.visible" :title="modal.title" :footer="null" width="50vw">
      <addNotice v-if="modal.visible && modal.from === 'addNotice'" :modalData="modal.data"/>
      <addSelfCheck v-if="modal.visible && modal.from === 'addSelfCheck'" :modalData="modal.data"/>
      <addInspection v-if="modal.visible && modal.from === 'addInspection'" :modalData="modal.data"/>
      <addCommand v-if="modal.visible && modal.from === 'addCommand'" :modalData="modal.data"/>
    </a-modal>
  </div>
</template>

<script>
import addNotice from "@/components/command/modal/addNotice.vue";
import addSelfCheck from "@/components/command/modal/addSelfCheck.vue";
import addInspection from "@/components/command/modal/addInspection.vue";
import addCommand from "@/components/command/modal/addCommand.vue";

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
    addCommand,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#modalIndex{}
</style>