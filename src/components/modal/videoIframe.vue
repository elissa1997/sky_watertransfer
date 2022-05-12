<template>
  <div id="videoIframe">
    <iframe 
      class="iframe"
      :src="'http://10.34.0.115:8383/fx/video.api?action=videoPlay&zdbm_='+this.attributes.zdbm"
    />
    <!-- {{attributes}} -->
  </div>
</template>

<script>
export default {
  name: "videoIframe",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#videoIframe{}

.iframe {
  width: 100%;
  height: 560px;
  border: none;
}
</style>