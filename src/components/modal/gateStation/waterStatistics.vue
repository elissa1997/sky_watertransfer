<template>
  <div id="waterStatistics">
    <dateRangeGroup @change="dateChange"/>

    <loading v-if="loading" :height="310"/>
    <div v-else class="tableAndChart">
      <noData v-if="waterVolumeList.length === 0"/>
      <template v-else>
        <div class="table">
          <a-table :columns="tableColums" :data-source="waterVolumeList" rowKey="tm" size="small" :pagination="false"/>
        </div>
        <div class="chart">
          <waterStatisticsChart :chartData="waterVolumeList"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {  Table } from 'ant-design-vue';

import loading from "@/components/public/loading.vue"
import noData from "@/components/public/noData.vue"
import dateRangeGroup from "@/components/public/dateRangeGroup.vue";
import waterStatisticsChart from "@/components/modal/gateStation/waterStatisticsChart.vue";

import { transferApi } from "@/network/liveData.js";
export default {
  name: "waterStatistics",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ATable:Table,

    loading,
    noData,
    dateRangeGroup,
    waterStatisticsChart
  },
  data() {
    return {
      loading: false,
      unfiedDate: [],
      mode: "day",
      waterVolumeList: [],
      tableColums: [
        {title: '时间',dataIndex: 'tm',},
        {title: '水量(万m³)',dataIndex: 'waterVolume',}
      ]
    }
  },
  methods: {
    dateChange(value) {
      this.dateUnfied(value);
    },

    // 日期统一拼接
    dateUnfied(value) {
      let differ =  undefined;
      let start = undefined;
      let end = undefined;
      switch (value[0].length) {
        case 10:
          this.mode = "day";
          this.unfiedDate = value;
          start = value[0];
          end = value[1];
        break;
        case 7:
          this.mode = "month";
          differ = Number(value[1].substring(value[1].length-2)) - Number(value[0].substring(value[0].length-2)) + 1
          start = this.$dayjs(value[0]).format("YYYY-MM-DD");
          end = this.$dayjs(start).add(differ,'month').subtract(1, 'day').format("YYYY-MM-DD");
        break;
        case 4:
          this.mode = "year";
          differ = Number(value[1]) - Number(value[0]) + 1
          start = this.$dayjs(value[0]).format("YYYY-MM-DD");
          end = this.$dayjs(start).add(differ,'year').subtract(1, 'day').format("YYYY-MM-DD");

        break;
        default:
          break;

      }
      start = start + " 00:00:00";
      end = end + " 23:59:59";
      this.unfiedDate = [];
      this.unfiedDate = [start, end];
      // let unfiedDate = this.$dayjs("2021-12").format("YYYY-MM-DD HH:mm:ss");
      // console.log(unfiedDate);
    },

    //获取水量（小时）
    getWaterStatistics() {
      this.loading = true;
      transferApi(this.getWaterStatisticsParams).then(res => {
        this.merge(res.obj);
      })
    },

    //小时水量合并
    merge(rawArray){
      let sublength = 0;
      if (this.mode === "day") {
        sublength = 10;
      }else if (this.mode === "month") {
        sublength = 7;
      }else if (this.mode === "year") {
        sublength = 4;
      }
      let merged = rawArray.reduce((total, cur, index) => {
      　　let hasValue = total.findIndex(current => { return current.tm.substring(0,sublength) === cur.tm.substring(0,sublength)})
      　　cur.tm = cur.tm.substring(0,sublength);
      　　hasValue === -1 && total.push(cur)
      　　hasValue !== -1 && (total[hasValue].waterVolume = total[hasValue].waterVolume + cur.waterVolume)
          return total
      }, [])
      // debugger
      // merged.foreach(element => {
      //   element.waterVolume = element.waterVolume.toFixed(4);
      // })
      this.waterVolumeList = merged;
      this.waterVolumeList.forEach(element => {
        element.waterVolume = element.waterVolume.toFixed(4);
      });
      this.loading = false;
    }

  },
  mounted() {
    // this.dateUnfied();
    let str = "2021-12-07 23:00:00"
  },
  computed: {
    getWaterStatisticsParams: function () {
      return {
        action: "getJsstHourWaterListByStcd",
        stcd: this.attributes.stcd,
        startTime: this.unfiedDate[0],
        endTime: this.unfiedDate[1],
        type: "2"
      }
    }
  },
  watch: {
    unfiedDate: {
      handler(newValue, oldValue) {
        this.getWaterStatistics();
      },
      immediate: false,
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
#waterStatistics{
  padding: 10px;
}

.tableAndChart {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 300px;
  .table {
    width: calc(50% - 5px);
    height: 100%;
    overflow-y: auto;
  }

  .chart {
    width: calc(50% - 5px);
  }
}
</style>