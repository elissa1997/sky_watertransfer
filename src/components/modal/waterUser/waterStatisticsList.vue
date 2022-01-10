<template>
  <div id="waterStatisticsList">
    <a-table :rowKey="this.waterVolumeData.dateIndex" align="center" :columns="colums" :data-source="this.waterVolumeData.data" :pagination="false" size="small"/>
  </div>
</template>

<script>
import { Table } from 'ant-design-vue'

export default {
  name: "waterStatisticsList",
  props: {
    waterVolumeData: {
      type: Object,
      default: undefined,
    }
  },
  components: {
    ATable:Table
  },
  data() {
    return {
      colums: [
        { title: '日期', dataIndex: this.waterVolumeData.dateIndex, width: "45%" },
        { title: '水量(万m³)', dataIndex: this.waterVolumeData.volumeIndex, width: "45%" },
      ]
    }
  },
  methods: {},
  mounted() {},
  computed:{
    // handlerData: function () {
    //   let data = this.waterVolumeData.data.map(element => {
    //     element[this.waterVolumeData.volumeIndex] = (element[this.waterVolumeData.volumeIndex] / 10000).toFixed(2)
    //     return element;
    //   })
    //   return data;
    // }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#waterStatisticsList{
  height: 300px;
  // width: 100%;
  overflow-y: auto;
}
</style>