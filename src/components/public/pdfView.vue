<template>
  <div id="pdfView" :style="'height:'+height">
    <embed class="content" :src="src" />
    <!-- <pdf      
      ref="pdf"
      v-for="i in numPages" 
      :key="i"  
      :src="src" 
      :page="i">
    </pdf> -->
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: "pdfView",
  props: {
    src: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: "calc(90vh - 5px)"
    }
  },
  components: {
    pdf
  },
  data() {
    return {
      numPages: undefined
    }
  },
  methods: {
    getNumPages() {
      let loadingTask = pdf.createLoadingTask(this.src)
      loadingTask.promise.then(pdf => {
        this.numPages = pdf.numPages
      })
    },
  },
  mounted() {
    // this.getNumPages();
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#pdfView{
  // height: 90vh;
  overflow-y: auto;
}

.content{
  height: calc(100% - 5px);
  width: 100%;
}
</style>