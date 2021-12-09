<template>
  <div id="gateStatus">
    <loading v-if="loading"/>
    <template v-else>
      <noData v-if="gateStatusList.length === 0"/>
      <div class="gateList" v-else>
        <div class="gateItem" v-for="(item,index) in gateStatusList" :key="index" @click="openGateHModal(item)">
          <div class="itemMeta">
            <span class="NO">{{item.title}}</span>
            <a-tag color="blue">{{item.stcd}}</a-tag>
          </div>

          <div class="itemHeight">
            <div v-if="item.gateH === '888'"><a-badge status="processing" />闸门提出水面</div>
            <div v-else-if="item.gateH === '999'"><a-badge status="success" />闸门全开</div>
            <div v-else-if="item.gateH === '444'"><a-badge status="warning" />闸门关闭</div>
            <div v-else>
              <a-badge status="processing" />闸门开度: 
              <span class="heightNum">{{item.gateH}}</span>
             m</div>
          </div>
        </div>
      </div>

      <a-modal v-model="modal.visible" :title="modal.title" :footer="null" centered :width="600">
        <div class="gateHightDetail">
          <gateChart v-if="modal.visible" :chartData="modal.data"/>
        </div>
      </a-modal>

    </template>
  </div>
</template>

<script>
import noData from "@/components/modal/noData.vue";
import loading from "@/components/modal/loading.vue";
import gateChart from "@/components/modal/gateStation/gateChart.vue";

import { transferApi } from "@/network/liveData.js";
import { Tag, Badge } from 'ant-design-vue';

export default {
  name: "gateStatus",
  components: {
    ATag:Tag,
    ABadge:Badge,

    noData,
    loading,
    gateChart
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
        type: 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #gateStatus{
    padding: 10px;
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

      .itemHeight {
        margin-top: 10px;

        .heightNum {
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