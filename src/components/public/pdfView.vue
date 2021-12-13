<template>
  <div id="pdfView">
    <embed class="content" :src="this.src" />
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
  height: 90vh;
  overflow-y: auto;
}

.content{
  height: calc(90vh - 5px);
  width: 100%;
}
</style>