<template>
  <div id="deviceStatus">
    <loading v-if="loading"/>
    <template v-else>
      <noData v-if="gateStatusList.length === 0"/>
      <div class="gateList" v-else>
        <div class="gateItem" v-for="(item,index) in gateStatusList" :key="index" @click="openGateHModal(item)">
          <div class="itemMeta">
            <span class="NO">{{item.title}}</span>
            <!-- <a-tag color="blue">{{item.stcd}}</a-tag> -->
          </div>

          <div class="itemStatus">
            <template v-if="item.title.indexOf('机组') !== -1">
              <div v-if="item.state === undefined"><a-badge status="default" />暂无数据</div>
              <div v-else-if="item.state === 0"><a-badge status="warning" />机组关闭</div>
              <div v-else-if="item.state === 1"><a-badge status="processing" />机组开启</div>
            </template>
            <template v-if="item.title.indexOf('门') !== -1">
              <div v-if="item.state === undefined"><a-badge status="default" />暂无数据</div>
            </template>
          </div>
        </div>
      </div>

      <a-modal v-model="modal.visible" :title="modal.title" :footer="null" centered :width="600" v-drag-modal>
        <div class="gateHightDetail">
          <deviceChart v-if="modal.visible" :chartData="modal.data"/>
        </div>
      </a-modal>

    </template>
  </div>
</template>

<script>
import noData from "@/components/public/noData.vue";
import loading from "@/components/public/loading.vue";
import deviceChart from "@/components/modal/pumpStation/deviceChart.vue";

import { transferApi } from "@/network/liveData.js";
import { Tag, Badge } from 'ant-design-vue';

export default {
  name: "deviceStatus",
  components: {
    ATag:Tag,
    ABadge:Badge,

    noData,
    loading,
    deviceChart
  },
  props: {
    attributes: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      loading: false,
      gateStatusList:[],
      modal: {
        visible: false,
        title: undefined,
        data: undefined
      }
    }
  },
  methods: {
    async getGateStatusList() {
      this.loading = true;
      await transferApi(this.gateStatusListParams).then(res => {
        if (res.status !== 1) {
          this.gateStatusList = res.obj;
        }
      })
      this.loading = false;
    },

    openGateHModal(gate) {
      this.modal.visible = true;
      this.modal.title = gate.title+"详情";
      this.modal.data = gate;
    }
  },
  mounted() {
    this.getGateStatusList();
  },
  computed: {
    gateStatusListParams: function () {
      return {
        action: "getSBStcdDesc",
        stcd: this.attributes.stcd,
        type: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #deviceStatus{
    padding: 20px 10px;
  }

  .gateList {
    display: grid;
    grid-template-columns: repeat(4, 22%);
    justify-content: space-evenly;
    row-gap: 20px;
    // column-gap: 10px;
    .gateItem {
      padding: 10px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #00000011;
     
      .itemMeta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .NO{
          // color: #838383;
          font-size: 16px;
          font-weight: 500;
        }

      }

      .itemStatus {
        margin-top: 10px;

        .statusNum {
          font-size: 17px;
          color: #1890ff;
        }
      }
    }
  }

  .gateHightDetail {
    padding: 10px;
  }
</style>