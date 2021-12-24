<template>
  <div id="liveWaterLevel">
    <loading v-if="loading"/>
    <template v-else>
      <div class="operat">
        <a-range-picker v-model="dateRange" valueFormat="YYYY-MM-DD:HH" format="YYYY-MM-DD:HH" :showTime="{valueFormat:'HH',format:'HH'}"/>
        <div class="btnGroup">
          <a-button class="btn" @click="openFlowModal">水位流量</a-button>
        </div>
      </div>
      <!-- {{attributes}} -->
      <noData v-if="chartData.time.length === 0"/>
      <chart v-else class="chart" :chartData="chartData"/>

      <a-modal v-model="modal.visible" :title="modal.title" :footer="null" centered :width="600" v-drag-modal>
        <div v-if="modal.title === '水位流量历史数据'">
          <a-table :columns="flowModalData.columns" :data-source="flowModalData.data" rowKey="tm" size="small" />
        </div>
      </a-modal>
    </template>
  </div>
</template>

<script>
import loading from "@/components/public/loading.vue";
import noData from "@/components/public/noData.vue";
import chart from "@/components/modal/pumpStation/waterLevelChart.vue";

import { DatePicker, Button, Table } from 'ant-design-vue';
import { transferApi } from "@/network/liveData.js";

export default {
  name: "liveWaterLevel",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ARangePicker:DatePicker.RangePicker,
    AButton:Button,
    ATable:Table,
    loading,
    noData,
    chart
  },
  data() {
    return {
      loading: false,
      dateRange: [],
      modal: {
        visible: false,
        title: undefined
      },
      chartData: {
        time: [],
        ppupz: [],
        ppdwz: [],
        mpqi: [],
        mpqacc:[]
      },
      flowModalData: {
        columns:[
          { title: '时间', dataIndex: 'tm' },
          { title: '上游水位', dataIndex: 'ppupz' },
          { title: '下游水位', dataIndex: 'ppdwz' },
          { title: '瞬时流量', dataIndex: 'mpqi' },
          { title: '累计流量', dataIndex: 'mpqacc' }
        ],
        data:[]
      }
    }
  },
  methods: {
    // 初始化日期范围
    initDateRange() {
      let startDate = this.$dayjs().subtract(7, 'day').format('YYYY-MM-DD:HH');
      let endDate = this.$dayjs().format('YYYY-MM-DD:HH');
      this.dateRange = [startDate, endDate]
    },

    //获取数据
    async getData() {
      await transferApi(this.chartParams).then(res=>{
        if (res.status != 1) {
          this.handlerRawData(res.obj);
          this.flowModalData.data = res.obj.all;
        }else {
          
        }
        // console.log(res.obj);
      })
    },

    //处理数据
    handlerRawData(res) {
      this.chartData.time = [];
      this.chartData.time = res.tm;
      this.chartData.ppupz = [];
      this.chartData.ppupz = res.ppupz;
      this.chartData.ppdwz = [];
      this.chartData.ppdwz = res.ppdwz;
      this.chartData.mpqi = [];
      this.chartData.mpqi = res.mpqi;
      this.chartData.mpqacc = [];
      this.chartData.mpqacc = res.mpqacc;
    },

    //打开水位流量弹窗
    openFlowModal() {
      this.modal.visible = true;
      this.modal.title = "水位流量历史数据";
    }
  },
  computed:{
    chartParams: function () {
      return {
        action: "getStageDischargeByStcd",
        stcd: this.attributes.stcd,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1],
        desc: "泵站"
      }
    }

  },
  mounted() {
    this.initDateRange();
    // this.getData();
  },
  watch: {
    dateRange: {
      async handler() {
        this.loading = true;
        await this.getData();
        this.loading = false;
      },
      immediate: false,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
#liveWaterLevel {
  padding: 10px;
}

.operat {
  display: flex;
  justify-content: space-between;

  .btnGroup .btn:not(:last-child) {
    margin-right: 10px;
  }
}

.noData{
  height: 500px;
}
</style>