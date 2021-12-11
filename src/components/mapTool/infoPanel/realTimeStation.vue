<template>
  <div id="realTimeStation">
    <loading v-if="loading"/>
    <template v-else>
      <div class="gateList">
        <div class="title">
          <div class="text">大型闸站信息</div>
          <div class="legend">
            <a-badge status="processing" text="闸门开启" />
            <a-badge status="warning" text="闸门全关" />
            <a-badge status="default" text="无数据" />

          </div>
        </div>
        <a-table class="table" :columns="gateStationList.columns" :data-source="gateStationList.data" rowKey="name" size="small" :pagination="false">
          <div slot="gateH" slot-scope="text, record">
            <a-badge status="default" v-if="record.gateH === ''"/>
            <template v-else>

              <a-tooltip v-if="typeof(record.gateH) === 'string' && record.gateH.indexOf('全关') !== -1">
                <template slot="title">
                  <div style="width: 100px; text-align:center;">{{record.gateH}}</div>
                </template>
                <a-badge status="warning" />
              </a-tooltip>

              <a-tooltip v-else-if="typeof(record.gateH) === 'object'">
                <template slot="title">
                  <div style="width: 100px; text-align:center;" v-for="(item,index) in record.gateH" :key="index">{{item}}</div>
                </template>
                <a-badge status="processing" />
              </a-tooltip>

              <a-tooltip v-else-if="typeof(record.gateH) === 'string'">
                <template slot="title">
                  <div style="width: 100px; text-align:center;">{{record.gateH}}</div>
                </template>
                <a-badge status="processing" />
              </a-tooltip>
              <!-- {{typeof(record.gateH)}} -->
              <!-- <a-badge status="processing" /> -->
            </template>
          </div>
        </a-table>
      </div>

      <div class="pumpList">
        <div class="title">
          <div class="text">泵站信息</div>
        </div>
        <a-table class="table" :columns="pumpStationList.columns" :data-source="pumpStationList.data" rowKey="name" size="small" :pagination="false"/>
      </div>

    </template>
  </div>
</template>

<script>
import { Badge, Table, Tooltip } from 'ant-design-vue';

import {transferApi} from "@/network/liveData.js";
import loading from "@/components/public/loading.vue";

export default {
  name: "realTimeStation",
  props: {},
  components: {
    ABadge:Badge,
    ATable:Table,
    ATooltip:Tooltip,

    loading
  },
  data() {
    return {
      loading: false,
      gateStationList: {
        columns: [
          { title: '测站名称', dataIndex: 'name', width: 87 },
          { title: '采集时间', dataIndex: 'tm', width: 89 },
          { title: '闸上水位', dataIndex: 'z', width: 72 },
          { title: '闸下水位', dataIndex: 'dwz', width: 72 },
          { title: '流量', dataIndex: 'q', width: 78 },
          { title: '闸门', dataIndex: 'gateH', scopedSlots: { customRender: 'gateH' }, width: 44, align: 'center'},
        ],
        data: []
      },
      pumpStationList: {
        columns: [
          { title: '测站名称', dataIndex: 'name', width: 87 },
          { title: '采集时间', dataIndex: 'tm', width: 89 },
          { title: '上游水位', dataIndex: 'z', width: 72 },
          { title: '下游水位', dataIndex: 'dwz', width: 72 },
          { title: '台数', dataIndex: 'omcn', width: 60 },
          { title: '功率', dataIndex: 'omPwr', width: 78 },
        ],
        data: []
      },
    }
  },
  methods: {
    async getStationList() {
      let params = {
        action: undefined,
        line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf"
      }
      this.loading = true;

      // 获取闸站数据
      params.action = "getAllJsonS4";
      params['level'] = "30";
      transferApi(params).then(res => {
        res.source.forEach(element => {
          this.gateStationList.data.push(element.attributes)
        });
        this.formatGateStationList();
        this.resortGateStationList();
      })

      // 获取泵站数据
      params.action = "getAllJsonB4";
      transferApi(params).then(res => {
        res.source.forEach(element => {
          this.pumpStationList.data.push(element.attributes);
        });
        this.formatPumpStationList();
      })

      this.loading = false;
    },

    // 格式化闸站数据
    formatGateStationList() {
      this.gateStationList.data.map(ele => {
        ele.tm = this.$dayjs(ele.tm).format("MM-DD HH:mm");
        ele.z = parseFloat(ele.z.substring(0,ele.z.length-1)).toFixed(2) + "m";
        ele.dwz = parseFloat(ele.dwz.substring(0,ele.dwz.length-1)).toFixed(2) + "m";
        ele.q = parseFloat(ele.q.substring(0,ele.q.length-1)).toFixed(2) + "m³/s";
        if (ele.gateH.indexOf(",") !== -1) {
          ele.gateH = ele.gateH.split(",");
        }
        return ele;
      })
    },

    // 手动指定闸站顺序
    resortGateStationList() {
      let manual = ["何巷闸","新胡洼闸","西坝口闸"].reverse();
      manual.forEach(name => {
        this.gateStationList.data.map((item,index) => {
          if(item.name == name){
              this.gateStationList.data.unshift(this.gateStationList.data.splice(index , 1)[0]);
          }
        })
      })
    },

    // 格式化泵站数据
    formatPumpStationList() {
      this.pumpStationList.data.map(ele => {
        ele.tm = (ele.tm !== "-")?this.$dayjs(ele.tm).format("MM-DD HH:mm"):"-";
        ele.z = (ele.z !== "-")?parseFloat(ele.z.substring(0,ele.z.length-1)).toFixed(2) + "m":"-";
        ele.dwz = (ele.dwz !== "-")?parseFloat(ele.dwz.substring(0,ele.dwz.length-1)).toFixed(2) + "m":"-";
        return ele;
      })
    }
  },
  mounted() {
    this.getStationList();
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#realTimeStation{
  padding: 10px;
  height: calc(60vh - 46px);
  overflow-y: auto;
}

.gateList{
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
      font-size: 16px;
      line-height: 24px;
      color: #099e07;
    }

    .legend {
      background-color: #ffffffbd;
      padding: 5px 10px;
      border-radius: 5px;

      ::v-deep .ant-badge:not(:first-child){
        margin-left: 10px;
      }
    }
  }
}

.pumpList {
  margin-top: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
      font-size: 16px;
      line-height: 24px;
      color: #099e07;
    }
  }
}

.table {
  margin-top: 10px;

  ::v-deep .ant-table-small {
    border: 0px;
    > .ant-table-content > .ant-table-body {
      border-radius: 5px;
      margin: 0px !important;
      background-color: #fff;
    }
  }

  .gatehTip {
    width: 100px;
    text-align: center;
  }
}



</style>