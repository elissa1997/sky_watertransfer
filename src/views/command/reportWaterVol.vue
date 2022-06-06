<template>
  <div id="reportWaterVol">
    <div class="operat">
      <!-- <span v-if="$hasPermission(this.$store.state.user.info.type, 'ABCD')">选择上报站点： </span>
      <a-select v-if="station.statsionList.length && $hasPermission(this.$store.state.user.info.type, 'ABCD')" v-model="station.stationSelected" style="width: 120px; marginRight: 10px" placeholder="">
        <a-select-option v-for="st in station.statsionList" :key="st.stcd" :value="st.stcd">{{st.name}}</a-select-option>
      </a-select> -->
      <a-select v-model="searchParams.stcd" style="width: 120px; marginRight: 10px" placeholder="筛选站点">
        <a-select-option v-for="st in station.statsionList" :key="st.stcd" :value="st.stcd">{{st.name}}</a-select-option>
      </a-select>
      <a-range-picker valueFormat="YYYY-MM-DD" @change="rangeChange" />
      <a-button @click="searchReset" style="margin-left: 10px">重置</a-button>
      <!-- <a-button @click="addWaterVol" type="primary" v-if="$hasPermission(this.$store.state.user.info.type, 'ABCD')" style="margin-left: auto;">水量上报</a-button> -->
    </div>
    <div class="tableWarp">
      <a-table :columns="tableData.colums" :data-source="tableData.data" rowKey="id" :pagination="false" bordered>
        <span  slot="startup_time" slot-scope="text, record">{{$dayjs(record.startup_time).format('HH:mm')}}</span>
        <span  slot="shutdown_time_date" slot-scope="text, record">{{$dayjs(record.shutdown_time).format('MM-DD')}}</span>
        <span  slot="shutdown_time_time" slot-scope="text, record">{{$dayjs(record.shutdown_time).format('HH:mm')}}</span>
        <span  slot="totalHour" slot-scope="text, record">{{$dayjs(record.shutdown_time).diff($dayjs(record.startup_time), 'h')}}小时</span>
        <span  slot="water" slot-scope="text, record">{{parseFloat(record.water/10000).toFixed(2)}}</span>
        <span  slot="station_ww" slot-scope="text, record">{{parseFloat(record.station_ww).toFixed(2)}}</span>

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
import { Button, Select, Table, Tag, DatePicker } from 'ant-design-vue';
import { receiveUnit } from "@/network/command/receiveUnit.js";
import { localData, dictTrans } from "@/util/readLocalData.js"
import { waterVolList } from "@/network/command/reportWaterVol.js";
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
    AButton:Button,
    ARangePicker:DatePicker.RangePicker
  },
  data() {
    return {
      station: {
        stcdDict: undefined,
        statsionList: [],
        stationSelected: undefined,
      },
      searchParams: {
        stcd: undefined,
        start_time: undefined,
        end_time: undefined,
      },
      tableData: {
        colums: [
          { title: '站点名称', dataIndex: 'unitName', width: 120, align: 'center',
            customRender(_, row) {
              return {
                children: row.unitName,
                attrs: {
                  rowSpan: row.unitNameRowSpan,
                },
              };
            },
          },
          { title: '时间', dataIndex: 'ts', width: 110, align: 'center',
            customRender(_, row) {
              return {
                children: row.ts,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },

          { title: '上游水位(m)', dataIndex: 'upstream_water_level', width: 120, align: 'center',
            customRender(_, row) {
              return {
                children: row.upstream_water_level,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },
          { title: '下游水位(m)', dataIndex: 'downstream_water_level', width: 120, align: 'center',
            customRender(_, row) {
              return {
                children: row.downstream_water_level,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },
          { title: '引流量(m³/s)', dataIndex: 'discharge', width: 120, align: 'center',
            customRender(_, row) {
              return {
                children: row.discharge,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },
          { title: '开启情况', dataIndex: 'open', width: 100, align: 'center',
            customRender(_, row) {
              return {
                children: row.open,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },
          { title: '日水量(万m³)', dataIndex: 'station_ww', width: 120, align: 'center', scopedSlots: { customRender: 'station_ww' },
            customRender(_, row) {
              return {
                children: row.station_ww,
                attrs: {
                  rowSpan: row.sw_cdRowSpan,
                },
              };
            },
          },
          { title: '操作状态', dataIndex: 'operation', width: 140, align: 'center' },
          { title: '开机时刻', dataIndex: 'startup_time', width: 90, align: 'center', scopedSlots: { customRender: 'startup_time' }},
          { title: '关机/节点日期', dataIndex: 'shutdown_time', width: 130, align: 'center', scopedSlots: { customRender: 'shutdown_time_date' }},
          { title: '关机/节点时刻', width: 130, align: 'center', scopedSlots: { customRender: 'shutdown_time_time' }},
          { title: '累计开机时长' , width: 130, align: 'center', scopedSlots: { customRender: 'totalHour' }},
          { title: '机组水量(万m³)', dataIndex: 'water', width: 140, align: 'center', scopedSlots: { customRender: 'water' }},
        ],
        data: []
      }
    }
  },
  methods: {
    rangeChange(date) {
      this.searchParams.start_time = date[0];
      this.searchParams.end_time = date[1];
    },

    searchReset() {
      for (let key in this.searchParams) {
        if (this.searchParams.hasOwnProperty(key)) {
          this.searchParams[key] = undefined;
        }
      }
    },

    addWaterVol() {
      // let dictItem = dictTrans(this.station.stcdDict, "stcd", this.station.stationSelected);
      this.$emit('addWaterVol');
    },

    async getReceiveUnit() {
      this.statsionList = [];
      if (this.$store.state.user.info) {
        let tempList = undefined;
        await receiveUnit(this.getReceiveUnit_params).then(res => {
          if (res.data.length) {
            tempList = res.data[0].stationCodeList;
            tempList.forEach(element => {
              let dictItem = dictTrans(this.station.stcdDict, "stcd", element);
              if (dictItem) {
                this.station.statsionList.push(dictItem);
              }
            });
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
          this.mergeRowCell()
        }
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getWaterVol();
    },

    update(text, record) {
      // let dictItem = dictTrans(this.station.stcdDict, "stcd", record.station_cd);
      this.$emit('updateWaterVol', record);
    },

    mergeRowCell () {
      this.rowSpan("unitName");
      this.rowSpan("sw_cd");
    },

    rowSpan (key) {
      let arr = this.tableData.data
        .reduce((result, item) => {
          if (result.indexOf(item[key]) < 0) {
            result.push(item[key]);
          }
          return result;
        }, [])
        .reduce((result, keys) => {
          const children = this.tableData.data.filter((item) => item[key] === keys);
          result = result.concat(
            children.map((item, index) => ({
              ...item,
              [`${key}RowSpan`]: index === 0 ? children.length : 0,
            }))
          );
          return result;
        }, []);
      this.tableData.data = arr;
    },
  },
  async mounted() {
    this.station.stcdDict = await localData("stcdName");
    await this.getReceiveUnit();
    this.getWaterVol();

    // 追加操作列暂时隐藏
    // if (this.$hasPermission(this.$store.state.user.info.type, 'ABCD')) {
    //   this.tableData.colums.push(
    //       { title: '操作', scopedSlots: { customRender: 'action' }, width: 100},
    //   )
    // }
  },
  computed: {
    getReceiveUnit_params: function (params) {
      return {
        action: "transferUnitList",
        line_cd: this.regData.line_cd,
        unitcode: this.$store.state.user.info.unitCode_
      }
    },

    getWaterVol_params: function (params) {
        return {
          action: "stationWwmList",
          reg_cd: this.regData.reg_cd,
          station_cd: this.searchParams.stcd,
          beginTime: this.searchParams.start_time,
          endTime: this.searchParams.end_time
        }
      
    }
  },
  watch: {
    'searchParams': {
      handler: function (newVal, oldVal) {
        this.getWaterVol();
      },
      deep: true
    },
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
  display: flex;
  align-items: center;
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