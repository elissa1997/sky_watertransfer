<template>
  <div id="gateChart">
    <a-range-picker v-model="dateRange" valueFormat="YYYY-MM-DD:HH" format="YYYY-MM-DD:HH" :showTime="{valueFormat:'HH',format:'HH'}"/>
    <loading v-if="!gateData"/>
    <div v-else id="chart"></div>
  </div>
</template>

<script>
import loading from "@/components/public/loading.vue";

import { DatePicker } from 'ant-design-vue';
import { transferApi } from "@/network/liveData.js";

export default {
  name: "gateChart",
  props: {
    chartData: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ARangePicker:DatePicker.RangePicker,

    loading
  },
  data() {
    return {
      dateRange: [],
      gateData: undefined
    }
  },
  methods: {
    // 初始化日期范围
    initDateRange() {
      let startDate = this.$dayjs().subtract(7, 'day').format('YYYY-MM-DD:HH');
      let endDate = this.$dayjs().format('YYYY-MM-DD:HH');
      this.dateRange = [startDate, endDate]
    },

    // 获取数据
    getGateChart() {
      transferApi(this.gateChartParams).then(res =>{
        this.gateData = res.obj;
        this.initChart();
      })
    },

    initChart(){
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
          data: ['闸门高度'],
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
            data: this.gateData.tm
          }
        ],
        yAxis: [
          {
            name: '高度(m)',
            type: 'value',
            axisLine: {
              show: true
            },
            position: "left",
            scale: true,
            minInterval: 1

          }
        ],
        series: [
          {
            name: '闸门高度',
            type: 'line',
            data: this.gateData.gateH,
            lineStyle: {
              width: 2
            },

            connectNulls: true      //连接null  '' 数据

          }
        ]
      };
      setTimeout(() => {
        let myChart = this.$echarts.init(document.getElementById('chart'));
        myChart.setOption(options);
      }, 200);
    }
  },
  mounted() {
    this.initDateRange();
    this.getGateChart();
  },
  computed: {
    gateChartParams: function () {
      return {
        action: "stcdToByZGateHZ",
        stcd: this.chartData.stcd,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1]
      }
    }
  },
  watch: {
    dateRange: {
      handler() {
        this.getGateChart();
      },
      immediate: false,
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
#gateChart{}

#chart {
  margin-top: 10px;
  height: 350px;
}
</style>