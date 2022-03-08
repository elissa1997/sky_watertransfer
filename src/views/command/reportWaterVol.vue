<template>
  <div id="reportWaterVol">
    <div class="operat" placeholder="选择站点">
      <a-select v-if="statsionList.length" v-model="stationSelected" style="width: 120px; marginRight: 10px" placeholder="">
        <a-select-option v-for="station in statsionList" :key="station.stcd" :value="station.stcd">{{station.name}}</a-select-option>
      </a-select>
      <a-button @click="addWaterVol" type="primary" v-if="this.$userInfo.type === 'B' || this.$userInfo.type === 'D'">水量上报</a-button>
    </div>
    <a-table :columns="tableData.colums" :data-source="tableData.data" rowKey="id" :pagination="false" >
      <!-- <a-tag :color="(status === '确认收到')?'green':'orange'" slot="status" slot-scope="status">{{status}}</a-tag> -->
      <span slot="action" slot-scope="text, record" @click="update(text, record)" class="actionWarp">
        <a class="linkBtn"><icon-edit theme="outline" size="20" fill="#1890ff" :strokeWidth="3" style="margin-right: 5px" />修改</a>
      </span>
    </a-table>
    <!-- {{stationSelected}} -->
    <!-- {{regData}} -->
  </div>
</template>

<script>
import { receiveUnit } from "@/network/command/receiveUnit.js";
import { dictTrans } from "@/util/readLocalData.js";
import { waterVolList } from "@/network/command/reportWaterVol.js";
import { Button, Select, Table, Tag } from 'ant-design-vue';

export default {
  name: "reportWaterVol",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {
    ATable:Table,
    ASelect:Select,
    ASelectOption:Select.Option,
    ASelectOptGroup:Select.OptGroup,
    ATag:Tag,
    AButton:Button
  },
  data() {
    return {
      statsionList: [],
      stationSelected: undefined,
      tableData: {
        colums: [
          // { title: 'sw_cd', dataIndex: 'sw_cd', width: 100 },
          { title: '站点名称', dataIndex: 'unitName' },
          { title: '上游水位(m)', dataIndex: 'upstream_water_level' },
          { title: '下游水位(m)', dataIndex: 'downstream_water_level' },
          { title: '引流量(m³/s)', dataIndex: 'discharge' },
          { title: '开启情况', dataIndex: 'open' },
          { title: '日水量(万m³)', dataIndex: 'station_ww' },
          { title: '时间', dataIndex: 'ts', width: 200 },
        ],
        data: []
      }
    }
  },
  methods: {
    addWaterVol() {
      this.$emit('addWaterVol');
    },

    async getReceiveUnit() {
      this.statsionList = [];
      if (this.$userInfo) {
        let tempList = undefined;
        // let obj = await dictTrans("stcdName", "stcd", "340323100788");
        await receiveUnit(this.getReceiveUnit_params).then(res => {
          tempList = res.data[0].stationCodeList;
        })
        for (let index = 0; index < tempList.length; index++) {
          const element = tempList[index];
          this.statsionList.push(await dictTrans("stcdName", "stcd", element));
        }
        console.log(this.statsionList)
        this.stationSelected = this.statsionList[0].stcd

        // 用户为BD类型的向regcd属性更新自己对应的站码
        if (this.$userInfo.type === 'B' || this.$userInfo.type === 'D') {
          let tempProps = this.regData;
          tempProps.stcd = this.stationSelected
          this.$emit('update:regData', tempProps);
        }
      }
    },

    async getWaterVol() {
      this.tableData.data = [];
      let stationObj = await dictTrans("stcdName", "stcd", this.stationSelected);
      waterVolList(this.getWaterVol_params).then(res => {
        if (res.code === "1" && res.data.length) {
          this.tableData.data = res.data.map(ele => {
            ele.unitName = stationObj.name
            return ele
          })
        }
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getWaterVol();
    },

    update(text, record) {
      console.log(text);
      this.$emit('updateWaterVol', record);
    }
  },
  async mounted() {
    await this.getReceiveUnit();
    if (this.$userInfo.type === "B" || this.$userInfo.type === "D") {
      this.tableData.colums.push(
          { title: '操作', scopedSlots: { customRender: 'action' }, width: 200},
      )
    }
  },
  computed: {
    getReceiveUnit_params: function (params) {
      return {
        action: "transferUnitList",
        line_cd: this.regData.line_cd,
        unitcode: this.$userInfo.unitCode_
      }
    },

    getWaterVol_params: function (params) {
      return {
        action: "stationWwmList",
        reg_cd: this.regData.reg_cd,
        station_cd: this.stationSelected
      }
    }
  },
  watch: {
    stationSelected: {
      handler(newVal, oldVal) {
        this.getWaterVol();
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
#reportWaterVol{
  height: 100%;
  border: 1px solid #00000021;
  border-radius: 5px;
}

.operat {
  padding: 10px;
  border-bottom: 1px solid #00000021;
}

.actionWarp {
  display: flex;
  align-items: center;
}

.linkBtn {
  display: flex;
  align-items: center;
}
</style>