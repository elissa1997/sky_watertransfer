<template>
  <div id="overViewLive">
    <iframe :src="`http://${url}gis.do?action=ssxlGht`" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "overViewLive",
  props: {},
  components: {},
  data() {
    return {
      url: process.env.VUE_APP_BASEURL
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#overViewLive{
  height: calc(100vh - 50px);
}
</style>