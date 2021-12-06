<template>
  <div id="featurePopup">
    <div class="item" v-for="dictItem in dict[layerId]" :key="dictItem.key">
      <!-- {{dictItem}} -->
      <div class="lable">{{dictItem.name}} :</div>
      <div class="value">{{attributes[dictItem.key]}}</div>
    </div>

    <template v-if="layerId === 'businessLayer_03'">
      <div class="gateH" v-if="attributes.gateH">
        <div class="gateItem" v-for="(gateItem,index) in gateHArray" :key="index">
          <a-tag color="blue">{{gateItem}}</a-tag>
        </div>
      </div>

      <div class="gateHNoData" v-else>
        <a-tag>
          孔门开度暂无上报数据
        </a-tag>
      </div>
    </template>

    <!-- <div v-if="attributes.gateH">{{gateHArray}}</div> -->

    <div class="btn" v-if="layerId !== 'businessLayer_01'">
      <a-button style="width: 60%;" type="primary" @click="openModal">详细信息</a-button>
    </div>
  </div>
</template>

<script>
import { Button, Tag } from 'ant-design-vue';

export default {
  name: "featurePopup",
  components: {
    AButton:Button,
    ATag:Tag
  },
  props: {
    attributes: {
      type: Object,
      default: {}
    },
    layerId: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      dict: {
        businessLayer_01: [
          {key: "name",name: "河段名称"},
          {key: "length",name: "长度(km)"},
          {key: "designDiversionLevel",name: "设计引水位"},
          {key: "designFlow",name: "设计流量(m³/s)"},
        ],
        businessLayer_02: [
          {key: "name",name: "测站名称"},
          {key: "stcd",name: "测站编码"},
          {key: "tm",name: "采集时间"},
          {key: "z",name: "上游水位"},
          {key: "dwz",name: "下游水位"},
          {key: "designZ",name: "设计调水位"},
          {key: "q",name: "设计流量"},
          {key: "mpQacc",name: "累计流量"},
          {key: "mpQi",name: "瞬时流量"},
          {key: "installedPower",name: "装机功率"},
          {key: "omcn",name: "开机台数"},
          {key: "omPwr",name: "开机功率"},
        ],
        businessLayer_03: [
          {key: "name",name: "测站名称"},
          {key: "stcd",name: "测站编码"},
          {key: "desc",name: "测站类型"},
          {key: "tm",name: "采集时间"},
          {key: "z",name: "闸上水位"},
          {key: "dwz",name: "闸下水位"},
          {key: "diversionZ",name: "引水水位"},
          {key: "q",name: "设计流量"},
          {key: "designQ",name: "设计流量"},
          {key: "number",name: "孔数"},
          // {key: "gateH",name: "孔门开度"},
        ]
      },
    }
  },
  methods: {
    openModal() {
      this.$emit('modal');
    }
  },
  computed: {
    gateHArray: function() {
      if (this.attributes.gateH.indexOf(",") !== -1) {
        return this.attributes.gateH.split(",");
      }else{
        return [this.attributes.gateH]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 #featurePopup {
   padding: 10px;


 }

 .item {
    font-size: 15px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lable {
      color: #595959;
    }
 }

 .gateH {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 32%);
    justify-content: space-between;
    align-items: center;
    justify-items: center;

    .gateItem {
      margin: 5px 0px;
      text-align: center;
      width: 95%;
      ::v-deep .ant-tag {
        // padding: 3px;
        // font-size: 14px;
        margin: 0px;
        width: 100%;
      }

    }
 }

 .gateHNoData {
    margin-top: 15px;
    text-align: center;
      ::v-deep .ant-tag {
        margin: 0px;
        width: 60%;
      }
 }

 .btn {
   margin-top: 15px;
   text-align: center;
 }
</style>