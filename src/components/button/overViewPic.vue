<template>
  <div id="overViewPic">
    <a-button type="primary" @click="overview_open">调水概化图</a-button>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import Vue from 'vue';
Vue.use(VueViewer);
import { Button } from 'ant-design-vue';


export default {
  name: "overViewPic",
  props: {},
  components: {
    AButton:Button
  },
  data() {
    return {
      images: [
        '/dist/images/Huai_NorthTransfer_overview.jpg'
      ],
      options: { "navbar": false, "title": false, "toolbar": false }
    }
  },
  methods: {
    overview_open() {
      const $viewer = this.$viewerApi({
        options:this.options,
        images: this.images
      })

      $viewer.zoom(5)
    },
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#overViewPic{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>