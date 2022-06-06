<template>
  <div id="addWaterVol">

    
    modalData参数:{{modalData}}
    <br/>
    <br/>

    type参数:{{type}}

    <br/>
    <br/>


    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="上报站点">
        <a-select v-model="formData.station_cd" style="width: 200px" placeholder="选择上报站点" :disabled="type === 'update'">
          <a-select-option v-for="st in station.statsionList" :key="st.stcd" :value="st.stcd">{{st.name}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Button, Form, Input, Tag, DatePicker, Alert, Select } from 'ant-design-vue';
import { publish, update ,autoWw } from "@/network/command/reportWaterVol.js"
import { localData, dictTrans } from "@/util/readLocalData.js"
import { receiveUnit } from "@/network/command/receiveUnit.js";

export default {
  name: "addWaterVol",
  props: {
    modalData: {
      type: Object,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    }
  },
  components: {
    AButton:Button,
    AForm:Form,
    AFormItem:Form.Item,
    AInput:Input,
    ATextarea:Input.TextArea,
    ATag:Tag,
    AAlert:Alert,
    ADatePicker:DatePicker,
    ASelect:Select,
    ASelectOption:Select.Option,
    ASelectOptGroup:Select.OptGroup,
  },
  data() {
    return {
      station: {
        stcdDict: undefined,
        statsionList: [],
      },
      formData: {
        reg_cd: this.modalData.reg_cd,
        upstream_water_level: '',
        downstream_water_level: '',
        discharge: '',
        open: '',
        station_ww: '',
        station_cd: undefined,
        ts: this.$dayjs().format("YYYY-MM-DD")
      },
    }
  },
  methods: {
    //获取下拉框数据
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

    // 修改时回显数据
    initUpdateData() {
      this.formData.station_cd = this.modalData.station_cd;
      this.formData.upstream_water_level = this.modalData.upstream_water_level;
      this.formData.downstream_water_level = this.modalData.downstream_water_level;
      this.formData.discharge = this.modalData.discharge;
      this.formData.open = this.modalData.open;
      this.formData.station_ww = this.modalData.station_ww;
      this.formData.ts = this.modalData.ts;
    },

    close(refresh) {
      this.$emit('close', {refresh, refName: "reportWaterVol"});
    }
  },
  async mounted() {
    this.station.stcdDict = await localData("stcdName");
    this.getReceiveUnit();

    if (this.type === "update") {
      this.initUpdateData();
    }
  },
  computed: {
    getReceiveUnit_params: function (params) {
      return {
        action: "transferUnitList",
        line_cd: this.modalData.line_cd,
        unitcode: this.$store.state.user.info.unitCode_
      }
    },

  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addWaterVol{
  padding: 10px;
}
</style>