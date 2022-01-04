<template>
  <div id="waterUser">

    <loading v-if="loading"/>
    <template v-else>
      <!-- 总计 -->
      <div class="meta card">
        <div class="name">{{waterUseVolGroup.name}}</div>
        <div class="item" >
          <div class="lable">许可量</div>  <div class="value">{{waterUseVolGroup.premit}}</div>
        </div>

        <div class="item">
          <div class="lable">计划量</div>  <div class="value">{{waterUseVolGroup.plan}}</div>
        </div>

        <div class="item">
          <div class="lable">年内取水量</div>  <div class="value">{{waterUseVolGroup.used}}</div>
        </div>
        <div class="item">
          <div class="lable">取水户</div>  <div class="value">{{waterUseVolGroup.num}}</div>
        </div>

        <a-button type="primary" @click="allTable">
          <icon-table theme="outline" size="16" fill="#ffffff" :strokeWidth="3"/>
          详细表格
        </a-button>

      </div>

      <div class="card" v-for="(item,index) in waterUseVolGroup.children" :key="index">
        <div class="meta">
          <div class="name">{{item.name}}</div>
          <div class="item">
            <div class="lable">许可量</div>  <div class="value">{{item.premit}}</div>
          </div>

          <div class="item">
            <div class="lable">计划量</div>  <div class="value">{{item.plan}}</div>
          </div>

          <div class="item">
            <div class="lable">年内取水量</div>  <div class="value">{{item.used}}</div>
          </div>
          <div class="item">
            <div class="lable">取水户</div>  <div class="value">{{item.num}}</div>
          </div>
          <a-button type="primary" @click="foldItem(item)">
            <component :is="(item.collapse)?'icon-up-c':'icon-down-c'" theme="outline" size="16" fill="#ffffff" :strokeWidth="3"/>
            查看详情
          </a-button>

        </div>

        <div class="table" v-if="item.collapse">
          <!-- {{item.children}} -->
          <a-table class="table" :columns="colums" :data-source="item.children" rowKey="wat_rig_owner" size="small" :pagination="false">
          <div slot="wat_t_amnt_ww" slot-scope="text, record">{{record.wat_t_amnt_ww.toFixed(2)}}</div>
          <div slot="appr_yr_ww" slot-scope="text, record">{{record.appr_yr_ww.toFixed(2)}}</div>
          <div slot="current_year_ww" slot-scope="text, record">{{record.current_year_ww.toFixed(2)}}</div>
          </a-table>
        </div>

      </div>
    </template>

  </div>
</template>

<script>
import { Table, Button } from 'ant-design-vue';
import { baseJson } from "@/network/staticData.js";
import { waterUserApi } from "@/network/liveData.js";

import loading from "@/components/public/loading.vue";

export default {
  name: "waterUser",
  props: {},
  components: {
    ATable:Table,
    AButton:Button,
    loading
  },
  data() {
    return {
      loading: false,
      cods:{
        mergeOwnerCodes: [],
        splitOwnerCodes: []
      },

      waterUseVolList: [],
      waterUseVolGroup: {},

      colums: [
        { title: '取水户名称', dataIndex: 'wat_rig_owner', width: 220 },
        { title: '许可量', dataIndex: 'wat_t_amnt_ww', width: 60, scopedSlots: { customRender: 'wat_t_amnt_ww' } },
        { title: '计划量', dataIndex: 'appr_yr_ww', width: 60,scopedSlots: { customRender: 'appr_yr_ww' } },
        { title: '取水量', dataIndex: 'current_year_ww', width: 60,scopedSlots: { customRender: 'current_year_ww' } }
      ]
    }
  },
  methods: {

    // 获取需要的社会统一信用代码
    async getWaterUserCods() {
      let allUser = [];
      let hb = baseJson("layer/HB_user.json");
      let sz = baseJson("layer/SZ_user.json");
      let bb = baseJson("layer/BB_user.json");
      await Promise.all([hb,sz,bb]).then(res => {
        res.forEach(item => {
          allUser = allUser.concat(item);
        })
        // console.log(allUser)
        allUser.map(item => { return item.attributes }).forEach(item => {
          (item.cert_num_mp_cds)?this.cods.splitOwnerCodes.push(item.cods):this.cods.mergeOwnerCodes.push(item.cods);
        });

        // 数组去重
        this.cods.splitOwnerCodes = Array.from(new Set(this.cods.splitOwnerCodes));

      })
    },

    // 根据取水户获取水量
    async getWaterUseVolList() {
      await waterUserApi(this.waterUseVolListParams).then(res => {
        this.waterUseVolList = res.data.map(ele => {
          ele.wat_t_amnt_ww = ele.wat_t_amnt_ww || 0;
          ele.appr_yr_ww = ele.appr_yr_ww || 0;
          ele.current_year_ww = ele.current_year_ww || 0;

          return ele;
        })
        this.groupWaterUseVol();
      })
    },

    // 取水量列表按城市分组
    groupWaterUseVol() {
      // 计算总计
      this.waterUseVolGroup = this.computedWaterUseVol(this.waterUseVolList);
      this.waterUseVolGroup.name = "总计";
      this.waterUseVolGroup.children = [];

      // 按城市分组
      let group = this.waterUseVolList.reduce(function (pre, current, index) {
        pre[current.adl_cd_nm] = pre[current.adl_cd_nm] || []
        pre[current.adl_cd_nm].push(current)
        return pre
      }, {})

      // 每组再次计算
      for (const key in group) {
        // console.log(key);
        const element = group[key];
        let childrenItem = this.computedWaterUseVol(element);
        childrenItem.name = key;
        childrenItem.collapse = false;
        childrenItem.children = element;
        this.waterUseVolGroup.children.push(childrenItem);

      }
      // this.waterUseVolGroup.children.push()
      // this.computedWaterUseVol(this.waterUseVolList);
    },

    computedWaterUseVol(arr) {
      let permit = 0.00;   // 许可量
      let plan = 0.00;     // 计划量
      let used = 0.00;     // 取水量
      let num = 0;         // 数量
      arr.forEach(item => {
        permit += item.wat_t_amnt_ww || 0;
        plan += item.appr_yr_ww || 0;
        used += item.current_year_ww || 0;
        num += 1;
      });

      return {        
        premit: permit.toFixed(2),
        plan: plan.toFixed(2),
        used: used.toFixed(2),
        num
      }
    },

    foldItem(item) {
      item.collapse = !item.collapse;
      this.$forceUpdate();
    },

    allTable() {
      this.$emit('waterUserAllTable',this.cods);
    }


  },
  async mounted() {
    this.loading = true;
    await this.getWaterUserCods();
    // console.log(this.waterUseVolListParams)
    await this.getWaterUseVolList();
    this.loading = false
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
#waterUser{
  padding: 10px;
  height: calc(60vh - 46px);
  overflow-y: auto;
}

.card {
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;

}

.meta {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 3px 8px -5px #00000036;
  .name {
    font-size: 16px;
    font-weight: 600;
    width: 55px;
  }

  .lable{
    font-size: 12px;
    color: #969696;
  }

  .value {
    font-size: 16px;
    color: #383838;

  }

  ::v-deep .ant-btn{
    display: flex;
    align-items: center;
    padding: 0 8px;
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
}
</style>