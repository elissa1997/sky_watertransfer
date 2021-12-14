<template>
  <div id="liveWaterLevel">
    <loading v-if="loading"/>
    <template v-else>
      <div class="operat">
        <a-range-picker v-model="dateRange" valueFormat="YYYY-MM-DD:HH" format="YYYY-MM-DD:HH" :showTime="{valueFormat:'HH',format:'HH'}"/>
        <div class="btnGroup">
          <a-button class="btn" @click="openFlowModal">水位流量</a-button>
          <a-button class="btn" @click="openGateHModal">闸门开度</a-button>
        </div>
      </div>
      <!-- {{attributes}} -->
      <noData v-if="chartData.time.length === 0"/>
      <chart v-else class="chart" :chartData="chartData"/>

      <a-modal v-model="modal.visible" :title="modal.title" :footer="null" centered :width="600" v-drag-modal>
        <div v-if="modal.title === '水位流量历史数据'">
          <a-table :columns="flowModalData.columns" :data-source="flowModalData.data" rowKey="tm" size="small" />
        </div>

        <div v-if="modal.title === '闸门开度历史数据'">
          <noData v-if="gateHModalData.data.length === 0"/> 
          <a-table v-else :columns="gateHModalData.columns" :data-source="gateHModalData.data" rowKey="tm" size="small" />
        </div>
      </a-modal>

    </template>
  </div>
</template>

<script>
import loading from "@/components/public/loading.vue";
import noData from "@/components/public/noData.vue";
import chart from "@/components/modal/gateStation/waterLevelChart.vue";

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
        dwz: [],
        z: [],
        alert: [],
        q:[]
      },
      flowModalData: {
        columns:[
          { title: '采集时间', dataIndex: 'tm' },
          { title: '对应流量', dataIndex: 'q' },
          { title: '闸上水位', dataIndex: 'z' },
          { title: '闸下水位', dataIndex: 'dwz' }
        ],
        data:[]
      },
      gateHModalData: {
        columns:[
          { title: "采集时间", dataIndex: "tm", width: 150},
          { title: "闸门开度", dataIndex: "gateH"},
          { title: "孔数", dataIndex: "number", width: 50}
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
        // console.log(res.obj);
        this.handlerRawData(res.obj);
        this.flowModalData.data = res.obj.all;
      })
    },

    //处理数据
    handlerRawData(res) {
      this.chartData.time = [];
      this.chartData.time = res.tm;
      this.chartData.dwz = [];
      this.chartData.dwz = res.dwz;
      this.chartData.alert = [];
      this.chartData.alert = res.wrz;
      this.chartData.z = [];
      this.chartData.z = res.z;
      this.chartData.q = [];
      this.chartData.q = res.q;
    },

    //打开水位流量弹窗
    openFlowModal() {
      this.modal.visible = true;
      this.modal.title = "水位流量历史数据";
    },

    //打开闸门开度弹窗
    openGateHModal() {
      this.modal.visible = true;
      this.modal.title = "闸门开度历史数据";
      this.getStationGateHList();
    },

    //获取闸门开度数据
    getStationGateHList() {
      transferApi(this.gateHParams).then(res => {
        if (res.status !== 1) {
          this.gateHModalData.data = res.obj.data;
        }
      })
    }
  },
  computed:{
    chartParams: function () {
      return {
        action: "getStageDischargeByStcd",
        stcd: this.attributes.stcd,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1],
        desc: "大型闸站"
      }
    },
    gateHParams: function () {
      return {
        action: "GateHTable",
        stcd: this.attributes.stcd,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1],
        pageSize: 1000,
        current: 1
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