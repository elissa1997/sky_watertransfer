<template>
  <div id="noData" :style="`height:${height}px`">
    <a-empty :description="descriptionText"/>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue';

export default {
  name: "noData",
  components: {
    AEmpty:Empty
  },
  props: {
    height: {
      type: Number,
      default: 300
    },
    descriptionText: {
      type: String,
      default: "暂无数据"
    }
  }
}
</script>

<style lang="scss" scoped>
#noData {
  width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>