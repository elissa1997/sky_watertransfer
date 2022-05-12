<template>
  <div id="waterUserAllTable">
    <!-- 所有取水户表格 -->
    <loading v-if="loading"/>
    <template v-else>
        <a-table id="tableRef" :columns="colums" :data-source="waterUseVolList" rowKey="wat_rig_owner" size="middle">
          <div slot="wat_t_amnt_ww" slot-scope="text, record">{{record.wat_t_amnt_ww.toFixed(2)}}</div>
          <div slot="appr_yr_ww" slot-scope="text, record">{{record.appr_yr_ww.toFixed(2)}}</div>
          <div slot="dayil_ww" slot-scope="text, record">{{(record.current_year_ww/$dayjs().dayOfYear()).toFixed(2)}}</div>
          <div slot="current_year_ww" slot-scope="text, record">{{record.current_year_ww.toFixed(2)}}</div>
        </a-table>
        <a-button class="exportBtn" type="primary" @click="exportWaterUserAll">导出</a-button>
    </template>
  </div>
</template>

<script>
import { Table, Button } from 'ant-design-vue';
import { waterUserApi } from "@/network/liveData.js";
import loading from "@/components/public/loading.vue";
import noData from "@/components/public/noData.vue";

import * as XLSX from "xlsx";

export default {
  name: "waterUserAllTable",
  props: {
    cods: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ATable:Table,
    AButton:Button,
    loading
    
  },
  data() {
    return {
      loading: false,
      waterUseVolList: [],
      colums: [
        { title: '取水户名称', dataIndex: 'wat_rig_owner', width: 180 },
        { title: '行政区域', dataIndex: 'adl_cd_nm', width: 50, align: 'center' },
        { title: '许可量(万m³)', dataIndex: 'wat_t_amnt_ww', width: 70, align: 'center', scopedSlots: { customRender: 'wat_t_amnt_ww' } },
        { title: '计划量(万m³)', dataIndex: 'appr_yr_ww', width: 70, align: 'center',scopedSlots: { customRender: 'appr_yr_ww' } },
        { title: '年内取水量(万m³)', dataIndex: 'current_year_ww', width: 90, align: 'center',scopedSlots: { customRender: 'current_year_ww' } },
        { title: '日均取水量(万m³)', width: 90, align: 'center',scopedSlots: { customRender: 'dayil_ww' } },
        // { title: '取水口位置', width: 60, align: 'center' }
      ]
    }
  },
  methods: {
    // 根据取水户获取水量
    async getWaterUseVolList() {
      this.loading = true;
      await waterUserApi(this.waterUseVolListParams).then(res => {
        this.waterUseVolList = res.data.map(ele => {
          ele.wat_t_amnt_ww = ele.wat_t_amnt_ww || 0;
          ele.appr_yr_ww = ele.appr_yr_ww || 0;
          ele.current_year_ww = ele.current_year_ww || 0;

          return ele;
        })
      })
      this.loading = false;
    },

    // 导出
    exportWaterUserAll() {
      const data = XLSX.utils.table_to_sheet(document.getElementById("tableRef"));
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'sheet1')
      XLSX.writeFile(wb,'全部取水户.xlsx')
    }
  },
  mounted() {
    this.getWaterUseVolList();
  },
  computed: {
    waterUseVolListParams: function () {
      return {
        action: "getList",
        mergeOwnerCodes: this.cods.mergeOwnerCodes.join(","),
        splitOwnerCodes: this.cods.splitOwnerCodes.join(",")
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#waterUserAllTable{
  padding-bottom: 5px;
  position: relative;
}

.exportBtn {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
</style>