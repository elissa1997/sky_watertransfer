<template>
  <div id="baseInfo">
    <loading v-if="loading"/>
    <template v-else>
      <div class="baseInfo">
        <div class="item">
          <div class="lable">取水户名称</div>
          <div class="value">{{baseInfo.data.wat_rig_owner}}</div>
        </div>
        <div class="item">
          <div class="lable">取水户代码</div>
          <div class="value">{{baseInfo.data.owner_code}}</div>
        </div>
        <div class="item">
          <div class="lable">企业地址</div>
          <div class="value">{{baseInfo.data.op_location}}</div>
        </div>
        <div class="item">
          <div class="lable">法人代表</div>
          <div class="value">{{baseInfo.data.leg_rep}}</div>
        </div>
        <div class="item">
          <div class="lable">联系人姓名</div>
          <div class="value">{{baseInfo.data.con_per}}</div>
        </div>
        <div class="item">
          <div class="lable">电话</div>
          <div class="value">{{baseInfo.data.con_mobphone}}</div>
        </div>
        <div class="item">
          <div class="lable">监控级别</div>
          <div class="value">{{baseInfo.data.mon_g>1?'非国控':'国控'}}</div>
        </div>
      </div>
      <div class="certList">
        <div class="tips">水量单位为 万m³</div>
        <a-table rowKey="cert_num_code" align="center" :columns="certListColumns" :data-source="baseInfo.data.ec_wr_int_pl_m_list" :pagination="false" size="small"/>
      </div>
    </template>
  </div>
</template>

<script>
import { Table } from 'ant-design-vue'
import { waterUserApi } from "@/network/liveData.js";
import loading from "@/components/public/loading.vue";
export default {
  name: "baseInfo",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ATable:Table,
    loading
  },
  data() {
    return {
      loading: true,
      baseInfo: undefined,
      certListColumns: [
        { title: '许可证编号', dataIndex: 'cert_num_code' },
        { title: '许可量', dataIndex: 'wat_ww' },
        { title: '年度计划量', dataIndex: 'appr_yr_ww' },
        { title: '年内累计取水量', dataIndex: 'wip_ww' }
      ]
    }
  },
  methods: {
    async getBaseInfo() {
      this.loading = true;
      await waterUserApi(this.getBaseInfoParams).then(res => {
        this.baseInfo = res.data;
				res.data.data.ec_wr_int_pl_m_list.forEach(element => {
					element.wip_ww = (Math.floor(element.wip_ww) / 10000).toFixed(2);
				});
      })
      this.loading = false;

    }
  },
  mounted() {
    this.getBaseInfo();
  },
  computed: {
    getBaseInfoParams: function () {
      if (this.attributes.cert_num_mp_cds) {
        // 取水证单独计算
        return {
					"action": "queryWaterFactoryDetailByCondition",
					"owner_code": this.attributes.cods,
					"cert_num_mp_cds": this.attributes.cert_num_mp_cds,
        }
      }else{
        // 取水证无须单独计算
        return {
					"action": "queryWaterFactoryDetailByCondition",
					"owner_code": this.attributes.cods,
        }
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#baseInfo{
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.baseInfo {
  width: calc(40% - 5px);
  border: 1px solid #e8e8e8;
  padding: 10px;
  border-radius: 5px;

  .item {
    line-height: 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .lable {
      width: 35%;
      color: #a3a3bb;
    }

    .lable::after {
      content: " :";
      color: #a3a3bb;
    }

    .value {
      width: calc(65% - 10px);
      color: #5d5d71;
    }
  }
}

.certList {
  width: calc(60% - 5px);
}

.tips {
  padding: 5px 10px;
  margin: 0px 0px 10px 0px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>