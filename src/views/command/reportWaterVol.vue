<template>
  <div id="reportWaterVol">
    <div class="operat" placeholder="选择站点" v-if="$hasPermission(this.$userInfo.type, 'ABCD')">
      <span v-if="$hasPermission(this.$userInfo.type, 'ABCD')">选择上报站点： </span>
      <a-select v-if="station.statsionList.length && $hasPermission(this.$userInfo.type, 'ABCD')" v-model="station.stationSelected" style="width: 120px; marginRight: 10px" placeholder="">
        <a-select-option v-for="st in station.statsionList" :key="st.stcd" :value="st.stcd">{{st.name}}</a-select-option>
      </a-select>
      <a-button @click="addWaterVol" type="primary" v-if="$hasPermission(this.$userInfo.type, 'ABCD')">水量上报</a-button>
    </div>
    <div class="tableWarp">
      <a-table :columns="tableData.colums" :data-source="tableData.data" rowKey="sw_cd" :pagination="false" >
        <!-- <a-tag :color="(status === '确认收到')?'green':'orange'" slot="status" slot-scope="status">{{status}}</a-tag> -->
        <span slot="action" slot-scope="text, record" @click="update(text, record)" class="actionWarp">
          <a class="linkBtn"><icon-edit theme="outline" size="20" fill="#1890ff" :strokeWidth="3" style="margin-right: 5px" />修改</a>
        </span>
      </a-table>
      
    </div>
    <!-- {{stationSelected}} -->
    <!-- {{regData}} -->
  </div>
</template>

<script>
import { receiveUnit } from "@/network/command/receiveUnit.js";
import { localData, dictTrans } from "@/util/readLocalData.js"
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
      station: {
        stcdDict: undefined,
        statsionList: [],
        stationSelected: undefined,
      },
      tableData: {
        colums: [
          // { title: 'sw_cd', dataIndex: 'sw_cd', width: 100 },
          { title: '时间', dataIndex: 'ts', width: 170, sorter: (a, b) => { return a.ts> b.ts? 1 : -1 }, sortDirections: ['descend', 'ascend'] },
          { title: '站点名称', dataIndex: 'unitName', sorter: (a, b) => a.unitName.localeCompare(b.unitName), sortDirections: ['descend', 'ascend'] },
          { title: '上游水位(m)', dataIndex: 'upstream_water_level' },
          { title: '下游水位(m)', dataIndex: 'downstream_water_level' },
          { title: '引流量(m³/s)', dataIndex: 'discharge' },
          { title: '开启情况', dataIndex: 'open' },
          { title: '日水量(万m³)', dataIndex: 'station_ww' },
        ],
        data: []
      }
    }
  },
  methods: {
    addWaterVol() {
      let dictItem = dictTrans(this.station.stcdDict, "stcd", this.station.stationSelected);
      this.$emit('addWaterVol', dictItem);
    },

    async getReceiveUnit() {
      this.statsionList = [];
      if (this.$userInfo) {
        let tempList = undefined;
        // let obj = await dictTrans("stcdName", "stcd", "340323100788");
        await receiveUnit(this.getReceiveUnit_params).then(res => {
          if (res.data.length) {
            tempList = res.data[0].stationCodeList;
            tempList.forEach(element => {
              let dictItem = dictTrans(this.station.stcdDict, "stcd", element);
              if (dictItem) {
                this.station.statsionList.push(dictItem);
              }
            });
            this.station.stationSelected = this.station.statsionList[0].stcd
          } 
        })
      }
    },

    async getWaterVol() {
      this.tableData.data = [];
      waterVolList(this.getWaterVol_params).then(res => {
        if (res.code === "1" && res.data.length) {
          this.tableData.data = res.data.map(ele => {
            ele.unitName = this.station.statsionList.filter(n => n.stcd === ele.station_cd)[0].name
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
      let dictItem = dictTrans(this.station.stcdDict, "stcd", record.station_cd);
      this.$emit('updateWaterVol', record,dictItem);
    }
  },
  async mounted() {
    this.station.stcdDict = await localData("stcdName");
    await this.getReceiveUnit();
    if (this.$hasPermission(this.$userInfo.type, 'BCD')) {
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
      if (this.$hasPermission(this.$userInfo.type, 'EA')) {
        return {
          action: "stationWwmList",
          reg_cd: this.regData.reg_cd,
          // station_cd: this.station.stationSelected
        }
      }else{
        return {
          action: "stationWwmList",
          reg_cd: this.regData.reg_cd,
          station_cd: this.station.stationSelected
        }
      }
    }
  },
  watch: {
    'station.stationSelected': {
      handler(newVal, oldVal) {
        this.getWaterVol();
      },
      deep: true
      
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
.tableWarp {
  overflow-y: auto;
  height: calc(100% - 60px);
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