<template>
  <div id="transferInfo">
    <div class="tool">
      <div class="yearSelect">
        <icon-left-c theme="outline" size="20" fill="#11998e" :strokeWidth="3" @click="yearChange('min')" style="cursor: pointer;"/>
        <p class="yearNum">{{year}}</p>
        <icon-right-c theme="outline" size="20" fill="#11998e" :strokeWidth="3" @click="yearChange('add')" style="cursor: pointer;"/>
        <!-- <a-button type="primary" size="small" style="margin-left: 20px" :disabled="year === Number($dayjs().format('YYYY'))" @click="yearChange('thisYear')">
          回到今年
        </a-button> -->
      </div>

      <div class="refresh" @click="getTransferRecordList">
        <icon-refresh theme="outline" size="20" fill="#11998e"/>
      </div>
    </div>
    <loading v-if="loading"/>
    <template v-else>
      <noData v-if="recordList.length === 0"/>
      <div v-else>
        <div class="recordList" v-for="(item,index) in recordList" :key="item.reg_cd">

          <div class="meta">
            <div class="no">{{index+1}}</div>
            <div class="item">
              <div class="lable">开始时间</div>
              <div class="value">{{item.reg_start_time}}</div>
            </div>

            <div class="item">
              <div class="lable">结束时间</div>
              <div class="value">{{item.reg_end_time}}</div>
            </div>

            <div class="item">
              <div class="lable">调水总量</div>
              <div class="value">{{item.totalWw}}(万m³)</div>
            </div>

            <div class="item">
              <!-- {{item.status === '0 '}} -->
              <a-tag color="green" v-if="item.status === '7'">调水已结束</a-tag>
              <a-tag color="blue" v-else>调水进行中</a-tag>
            </div>

          </div>



          <div class="operat">
            <a-button type="default" @click="foldItem(item)">
              <component :is="(item.collapse)?'icon-up-c':'icon-down-c'" theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              每日水量
            </a-button>

            <!-- <a-button type="default">
              <icon-broadcast-one theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              流程概览
            </a-button> -->

            <a-button type="default" @click="openCommand(item)">
              <icon-workbench theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              调水过程
            </a-button>

          </div>

          <div class="dailyWaterVolume" v-if="item.collapse">
            <!-- <a-alert message="" type="info" show-icon /> -->
            <div class="tips">各泵站水量单位为 万m³</div>
            <a-table class="table" :columns="dailyWaterVolume.colums" :data-source="dailyWaterVolume.data" rowKey="ts" size="small" :pagination="false">
              <!-- <div slot="wat_t_amnt_ww" slot-scope="text, record">{{record.wat_t_amnt_ww.toFixed(2)}}</div>
              <div slot="appr_yr_ww" slot-scope="text, record">{{record.appr_yr_ww.toFixed(2)}}</div>
              <div slot="current_year_ww" slot-scope="text, record">{{record.current_year_ww.toFixed(2)}}</div> -->
            </a-table>
          </div>

        <!-- {{item}} -->

        </div>
      </div>

    </template>
  </div>
</template>

<script>
import { Table, Button, Tag, Alert } from 'ant-design-vue';
import noData from "@/components/public/noData.vue";
import loading from "@/components/public/loading.vue";
import { transferRecordList, transferRecordDetail } from "@/network/command/transferRecord.js";
export default {
  name: "transferInfo",
  props: {},
  components: {
    ATable:Table,
    AButton:Button,
    ATag:Tag,
    AAlert:Alert,
    noData,
    loading
  },
  data() {
    return {
      loading: false,
      year: this.$dayjs().format("YYYY"),
      recordList: [],
      dailyWaterVolume: {
        colums: [
          { title: '时间', dataIndex: 'ts' },
          { title: '固镇站', dataIndex: 'gzbz' },
          { title: '娄宋站', dataIndex: 'lsbz' },
          { title: '宿州站', dataIndex: 'szbz' },
          { title: '四铺站', dataIndex: 'spbz' },
        ],
        data: []
      },
    }
  },
  methods: {
    yearChange(type) {
      if (type === "min") {
        (this.year <= 2020)?null:this.year--
      }

      if (type === "add") {
        (this.year >= Number(this.$dayjs().format('YYYY')))?this.year = Number(this.$dayjs().format('YYYY')):this.year++
      }

      if (type === "thisYear") {
        this.year = Number(this.$dayjs().format('YYYY'))
      }

      this.getTransferRecordList();
    },

    async getTransferRecordList() {
      this.loading = true;
      await transferRecordList(this.transferRecordListParams).then(res => {
        this.recordList = res.data.map(ele => {
          ele.reg_start_time = this.$dayjs(ele.reg_start_time).format("MM月DD日");
          ele.reg_end_time = this.$dayjs(ele.reg_end_time).format("MM月DD日");
          ele.collapse = false;
          return ele;
        });
      })
      this.loading = false;
    },

    async getTransferRecordDetail(item) {
      await transferRecordDetail(this.transferRecordDetailParams(item)).then(res => {
        this.dailyWaterVolume.data = res.data;
      })
    },

    foldItem(item) {
      item.collapse = !item.collapse;
      this.getTransferRecordDetail(item);
    },

    openCommand(item) {
      this.$emit('openCommand', item);
    }
  },
  mounted() {
    this.getTransferRecordList();
  },
  computed: {
    transferRecordListParams: function () {
      return {
        action: "regulationList",
        line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf",
        year: this.year

      }
    },
    transferRecordDetailParams: function () {
      return function(item){
        return {
          action: "regulationStationWwm",
          regCd: item.reg_cd
        }
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#transferInfo{
  padding: 10px;
  height: calc($infoPanelHeight - 46px);
  overflow-y: auto;
}

.tool{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .yearSelect {
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0px 5px;
    border-radius: 5px;
    background-color: #ffffffbd;
    .yearNum{
      font-size: 20px;
      font-weight: 700;
      margin: 0px 10px;
      background: linear-gradient(61deg, #11998e, #38ef7d);
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
    }
  }

  .refresh {
    margin-left: 5px;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #ffffffbd;
    cursor: pointer;
  }
}

.recordList {
  background-color: #fff;
  border-radius: 5px;

  .meta {
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
  
    .no {
      margin-left: 10px;
      font-size: 25px;
      font-weight: 700;
      background: linear-gradient(0deg,#11998e,#38ef7d);
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
    }
    .lable{
      font-size: 12px;
      color: #969696;
    }
    .value {
      font-size: 16px;
      color: #383838;
    }



  }

  .operat {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #00000018;
    box-shadow: 0px 3px 8px -5px #00000036;

    ::v-deep .i-icon {
      margin-right: 8px;
    }
  }

  ::v-deep .ant-btn{
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .dailyWaterVolume {
    margin-top: 5px;

    .tips {
      padding: 5px 10px;
      margin: 10px 5px 5px 5px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }

    ::v-deep .ant-table-small {
      border: 0px;
      > .ant-table-content > .ant-table-body {
        border-radius: 5px;
        margin: 0px !important;
        background-color: #fff;
      }
    }
  }
}

.recordList:not(:first-of-type) {
  margin-top: 10px;
}
</style>