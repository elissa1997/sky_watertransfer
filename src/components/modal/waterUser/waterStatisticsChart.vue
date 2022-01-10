<template>
  <div id="waterStatisticsChart">
    
  </div>
</template>

<script>
export default {
  name: "waterStatisticsChart",
  props: {
    waterVolumeData: {
      type: Object,
      default: undefined,
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    initChart() {
      let e = this; 
      let options = {
				tooltip: {
						trigger: 'axis',
						axisPointer: {
								type: 'shadow'
						},
						formatter: '{b}<br/>{c} 万m³'
				},
				dataZoom: [{
						type: 'inside'
				}, {
						type: 'slider'
				}],
        xAxis: {
          type: 'category',
          data: this.handlerData.tm
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.handlerData.waterVolume,
            type: 'bar',
            itemStyle: {
              color: new e.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#38ef7d" // 0% 处的颜色
              },{
                offset: 1,
                color: "#11998e" // 100% 处的颜色
              }], false)
            }
          }
        ]
      };
      setTimeout(() => {
        let myChart = this.$echarts.init(document.getElementById('waterStatisticsChart'));
        myChart.setOption(options);
      }, 200);
    }
  },
  mounted() {},
  computed:{
    handlerData: function () {
      let tm = [];
      let waterVolume = [];

      this.waterVolumeData.data.forEach(element => {
        tm.push(element[this.waterVolumeData.dateIndex]);
        waterVolume.push(element[this.waterVolumeData.volumeIndex]);
      })

      return {tm, waterVolume};
    }
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        this.initChart();
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
#waterStatisticsChart{
  height: 300px;
  // width: 100%;
}
</style>