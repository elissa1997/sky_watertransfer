<template>
  <div id="chart">

  </div>
</template>

<script>

export default {
  name: "chart",
  props:{
    chartData: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {

    }
  },
  methods: {

    initChart() {
      console.log("渲染图表");
      let options = {
        opts:{
          width:750
        },
        grid: {
          bottom: 80,
          left : 45,
          right :30
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        legend: {
          data: ['上游水位', '下游水位', '瞬时流量','累计水量'],
          left: 10
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: false},
            data: this.chartData.time
          }
        ],
        yAxis: [
          {
            name: '水位(m)',
            type: 'value',
            axisLine: {
              show: true
            },
            position: "left",
            scale: true,
            minInterval: 1
          },
          {
            name: '流量(m³/s)',
            type: 'value',
            axisLine: {
              show: true
            },
            position: "right",
            scale: true,
            minInterval: 1

          }
        ],
        series: [
          {
            name: '上游水位',
            type: 'line',
            yAxisIndex: 0,
            data: this.chartData.ppupz,
            lineStyle: {
              width: 2
            },

            connectNulls: true      //连接null  '' 数据

          },
          {
            name: '下游水位',
            type: 'line',
            yAxisIndex: 0,
            lineStyle: {
              width: 2
            },
            data: this.chartData.ppdwz,

            connectNulls: true      //连接null  '' 数据
          },
          {
            name: '瞬时流量',
            type: 'line',
            yAxisIndex: 1,
            lineStyle: {
              width: 2
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.mpqi,

            connectNulls: true      //连接null  '' 数据
          },
          {
            name: '累计水量',
            type: 'line',
            yAxisIndex: 1,
            lineStyle: {
              width: 2,
              // color:"#f30b0b"
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.mpqacc,

            connectNulls: true      //连接null  '' 数据
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById('chart'));
      myChart.setOption(options);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initChart();
    }, 200);
  },
  watch: {
    chartData: {
      handler() {
        setTimeout(() => {
          this.initChart();
        }, 200);
      },
      immediate: false,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
#chart {
  width: 100%;
  height: 400px;
  margin-top: 10px;
}
</style>