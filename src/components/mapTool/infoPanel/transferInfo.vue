<template>
  <div id="transferInfo">
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
              <div class="value">{{item.totalWw}}</div>
            </div>

            <div class="item">
              <!-- {{item.status}} -->
              <a-tag color="green" v-if="item.status === '1'">调水已结束</a-tag>
              <a-tag color="blue" v-if="item.status === '0'">调水进行中</a-tag>
            </div>

          </div>


          <div class="operat">
            <a-button type="default" @click="foldItem(item)">
              <component :is="(item.collapse)?'icon-up-c':'icon-down-c'" theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              查看详情
            </a-button>

            <a-button type="default" @click="foldItem(item)">
              <icon-broadcast-one theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              流程概览
            </a-button>

            <a-button type="default" @click="foldItem(item)">
              <icon-workbench theme="outline" size="16" fill="#969696" :strokeWidth="3"/>
              调水指令
            </a-button>

          </div>

        </div>
      </div>

    </template>
  </div>
</template>

<script>
import { Table, Button, Tag } from 'ant-design-vue';
import noData from "@/components/public/noData.vue";
import loading from "@/components/public/loading.vue";
import { transferRecordList } from "@/network/command/transferRecord.js";
export default {
  name: "transferInfo",
  props: {},
  components: {
    ATable:Table,
    AButton:Button,
    ATag:Tag,
    noData,
    loading
  },
  data() {
    return {
      loading: false,
      recordList: [],
    }
  },
  methods: {
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

    foldItem(item) {
      item.collapse = !item.collapse;
    }
  },
  mounted() {
    // this.getTransferRecordList();
  },
  computed: {
    transferRecordListParams: function () {
      return {
        action: "regulationList",
        line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf"
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#transferInfo{
  padding: 10px;
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
    padding: 5px;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #00000018;
  }

  ::v-deep .i-icon{
    height: 16px;
    margin-right: 5px;
  }

  ::v-deep .ant-btn{
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
}
</style>