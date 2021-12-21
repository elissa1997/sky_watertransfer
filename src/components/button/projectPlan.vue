<template>
  <div id="projectPlan">
    <a-button type="primary" size="large" @click="openPlan">
      <icon-building-one theme="outline" size="16" fill="#ffffff" :strokeWidth="3"/>
      工程概况
      </a-button>
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
  ::v-deep .ant-btn{
    width: 135px;
    display: flex;
    align-items: center;
    background-color: #0bb408;
    border: 1px solid #0bb408;

  }
  
  ::v-deep .i-icon {
    margin-right: 8px;
  }
}
</style>