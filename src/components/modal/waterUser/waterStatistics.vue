<template>
  <div id="waterStatistics">
    <div class="setParams">
      <a-popover trigger="click" arrow-point-at-center placement="bottom">
        <template slot="content">
          <a-tree
            checkable
            :tree-data="monitorPointTree"
            :defaultCheckedKeys="defaultKeys"
            :selectable="false"
            @check="treeCheck"
          />
        </template>
        <a-button type="primary">勾选监测点</a-button>
      </a-popover>

      <dateRangeGroup class="dateRangeGroup" @change="dateChange"/>
    </div>
    
    <loading v-if="loading"/>
    <div class="listAndChart" v-else>
      <waterStatisticsList class="list" :waterVolumeData="waterVolumeData"/>
      <waterStatisticsChart class="chart" :waterVolumeData="waterVolumeData"/>
    </div>
  </div>
</template>

<script>
import { Popover, Button, Tree } from 'ant-design-vue';
import { waterUserApi } from "@/network/liveData.js";
import loading from "@/components/public/loading.vue";
import dateRangeGroup from "@/components/public/dateRangeGroup.vue";
import waterStatisticsChart from "@/components/modal/waterUser/waterStatisticsChart.vue";
import waterStatisticsList from "@/components/modal/waterUser/waterStatisticsList.vue";
export default {
  name: "waterStatistics",
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  components: {
    APopover:Popover,
    AButton:Button,
    ATree:Tree,
    loading,
    dateRangeGroup,
    waterStatisticsChart,
    waterStatisticsList
  },
  data() {
    return {
      monitorPointTree: [],
      defaultKeys: [],
      waterVolumeParams: {
        monitorPointSelect: [],
        beginTime: undefined,
        endTime: undefined,
        dateLevel: undefined
      },

      loading: true,
      waterVolumeData: {
        dateIndex: undefined,
        volumeIndex: undefined,
        data: []
      }
    }
  },
  methods: {
    getMonitorPoint() {
      waterUserApi(this.getMonitorPointParams).then(res => {
        this.parseTree(res.data);
        this.monitorPointSelectDefault();
      })
    },

    // 解析为树
    parseTree(rawData) {
      let tree = rawData.map(pele => {
        let mpList = undefined;
        mpList = pele.mpList.map(ele => {
          return {
            title: ele.mp_nm,
            key: ele.mp_cd,
            state: ele.is_stat
          }
        })
        return {
          title: pele.cert_num,
          key: pele.cert_num_code,
          children: mpList
        }
      })

      // console.log(tree)
      this.monitorPointTree = tree;

    },

    // 监测点树勾选响应
    treeCheck(checkedKeys, e) {
      this.waterVolumeParams.monitorPointSelect = [];
      let allCheck = [...checkedKeys,...e.halfCheckedKeys];
      allCheck.forEach(element => {
        if (!element.includes("-")) {
          this.waterVolumeParams.monitorPointSelect.push(element)
        }
      })
    },

    // 初始选中全部监测点
    monitorPointSelectDefault() {
      this.monitorPointTree.forEach(element => {
        this.dfs(element, []);
      });
    },

    dateChange(data) {
      this.waterVolumeParams.beginTime = data[0];
      this.waterVolumeParams.endTime = data[1];
      if (data[0].length === 10) {
        this.waterVolumeParams.dateLevel = 0;
        this.waterVolumeData.dateIndex = "yyyy_mm_dd";
        this.waterVolumeData.volumeIndex = "dayww";
      }else if (data[0].length === 7) {
        this.waterVolumeParams.dateLevel = 1;
        this.waterVolumeData.dateIndex = "yyyymm";
        this.waterVolumeData.volumeIndex = "monethww";
      }else if (data[0].length === 4) {
        this.waterVolumeParams.dateLevel = 2;
        this.waterVolumeData.dateIndex = "yyyy";
        this.waterVolumeData.volumeIndex = "yearww";
      }
    },

    dfs(node, nodeList) {
      if (node) {   
        nodeList.push(node);
        let children = node.children;
        if (children) {
          for (let i = 0; i < children.length; i++) {
            // console.log(children[i].title);
            this.defaultKeys.push(children[i].key);
            this.waterVolumeParams.monitorPointSelect.push(children[i].key);
            this.dfs(children[i],nodeList)
          }
        }
      }
    },

    // 获取水量数据
    async getWaterVolume() {
      this.loading = true;
      await waterUserApi(this.getWaterVolumeParams).then(res => {
        this.waterVolumeData.data = [];
        this.waterVolumeData.data = res.data.map(ele => {
          ele[this.waterVolumeData.volumeIndex] = (ele[this.waterVolumeData.volumeIndex]/10000).toFixed(2);
          return ele;
        });
      })
      this.loading = false;
    }

  },
  mounted() {
    this.getMonitorPoint();
  },
  computed: {
    getMonitorPointParams: function () {
      if (this.attributes.cert_num_mp_cds) {
        // 取水证单独计算
        return {
					"action": "queryMonitorPointList",
					"owner_code": this.attributes.cods,
					"cert_num_mp_cds": this.attributes.cert_num_mp_cds,
        }
      }else{
        // 取水证无须单独计算
        return {
					"action": "queryMonitorPointList",
					"owner_code": this.attributes.cods,
        }
      }
    },

    getWaterVolumeParams: function () {
      return {
        action: "queryWaterCountByDayMonthYearOnConditions",
        dateLevel: this.waterVolumeParams.dateLevel,
        beginTime: this.waterVolumeParams.beginTime,
        endTime: this.waterVolumeParams.endTime,
        mp_cd: this.waterVolumeParams.monitorPointSelect.join(",")
      }
    }
  },
  watch: {
    waterVolumeParams: {
      handler(newValue, oldValue) {
        if (newValue.monitorPointSelect.length) {
          this.getWaterVolume();
        }
      },
      deep: true,
      immediate: false
    }
  }
}
</script>
<style lang="scss" scoped>
#waterStatistics{
  padding: 10px;
}

.setParams {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .dateRangeGroup {
    width: calc(100% - 102px - 20px);
  }
}

.listAndChart {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
  .list {
    width: calc(50% - 5px);
  }

  .chart {
    width: calc(50% - 5px);
  }
}
</style>