<template>
  <div id="loading" :style="`height:${height}px`">
    <a-spin/>
  </div>
</template>

<script>
import { Spin } from 'ant-design-vue';

export default {
  name: "loading",
  props: {
    height: {
      type: Number,
      default: 300
    }
  },
  components:{
    ASpin:Spin
  }
}
</script>

<style lang="scss" scoped>
#loading {
  width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>