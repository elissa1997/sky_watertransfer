<template>
  <div id="projectPlan">
    <a-button type="primary" size="large" @click="openPlan">工程概况</a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';


export default {
  name: "projectPlan",
  props: {},
  components: {
    AButton:Button
  },
  data() {
    return {}
  },
  methods: {
    openPlan() {
      this.$emit('openPlan',"/dist/pdf/[2019]652.pdf");
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#projectPlan{
  position: absolute;
  bottom: 60px;
  right: 10px;
}
</style>