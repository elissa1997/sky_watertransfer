<template>
  <div id="addWaterVol">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <a-alert message="填报之前请先阅读以下说明" type="info" show-icon
        description="上游水位、下游水位、引流量 为填报日期08:00数据，日水量 为填报日期前一天(00:00-24:00)累计数据"  />
      <a-form-item label="上报站点">
        <a-tag>{{this.station.name}}</a-tag>
      </a-form-item>

      <a-form-item label="上游水位">
        <a-input v-model="formData.upstream_water_level" placeholder="填写上游水位" addonAfter="m"></a-input>
      </a-form-item>

      <a-form-item label="下游水位">
        <a-input v-model="formData.downstream_water_level" placeholder="填写下游水位" addonAfter="m"></a-input>
      </a-form-item>

      <a-form-item label="引流量">
        <a-input v-model="formData.discharge" placeholder="填写引流量" addonAfter="m³/s"></a-input>
      </a-form-item>

      <a-form-item label="开启情况">
        <a-input v-model="formData.open" placeholder="填写开启情况"></a-input>
      </a-form-item>

      <a-form-item label="日水量">
        <a-input v-model="formData.station_ww" placeholder="填写日水量" addonAfter="万m³"></a-input>
      </a-form-item>

      <a-form-item label="填报时间">
        <a-date-picker v-model="formData.ts" :disabled="station ? false : true" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" style="width: 100%" @change="changeDate"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 10, offset: 3 }">
        <a-button type="primary" v-if="station" @click="publishWaterVol">保存</a-button>
        <a-button type="primary" v-else @click="updateWaterVol">保存修改</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
    <!-- {{record}} -->
  </div>
</template>

<script>
import { publish, update ,autoWw } from "@/network/command/reportWaterVol.js"
import { Button, Form, Input, Tag, DatePicker,Alert } from 'ant-design-vue';

export default {
  name: "addWaterVol",
  props: {
    modalData: {
      type: Object,
      default: undefined
    },
    station: {
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
    ADatePicker:DatePicker
  },
  data() {
    return {
      formData: {
        reg_cd: this.modalData.reg_cd,
        upstream_water_level: '',
        downstream_water_level: '',
        discharge: '',
        open: '',
        station_ww: '',
        ts: this.$dayjs().format("YYYY-MM-DD")
      },
    }
  },
  methods: {
    publishWaterVol() {
      publish(this.publishWaterVol_params_data.params, this.publishWaterVol_params_data.data).then(res => {
        if (res.code === "1") {
          this.$message.success("上报成功")
          this.close(true);
        }else if (res.code === "-1") {
          this.$message.warning("上报失败，请重试")
        }
      })
    },

    updateWaterVol() {
      update(this.updateWaterVol_params_data.params, this.updateWaterVol_params_data.data).then(res => {
        if (res.code === "1") {
          this.$message.success("修改成功")
          this.close(true);
        }else if (res.code === "-1") {
          this.$message.warning("修改失败，请重试")
        }
      })
    },
    //时间改变上面的上游水位也要改变
    changeDate(datestr){
      this.formData.upstream_water_level = '';
      this.formData.downstream_water_level = '';
      this.formData.discharge = '';
      if (this.station.type === 'pump') {
        autoWw({action: "getPumpByStcdTm",stcd: this.station.stcd,time: datestr+ " 08"}).then(res => {
          if (res.status == 200 && res.obj) {
            this.formData.upstream_water_level = res.obj.pPupZ;
            this.formData.downstream_water_level = res.obj.pPuDwZ;
            this.formData.discharge = res.obj.mpQi
          }
        })
      } else {
        autoWw({action: "getGateRByStcdTm",stcd: this.station.stcd,time: datestr+ " 08"}).then(res => {
          if (res.status == 200 && res.obj) {
            this.formData.upstream_water_level = res.obj.upZ;
            this.formData.downstream_water_level = res.obj.dwZ;
            this.formData.discharge = res.obj.gtq
          }
        })
      }
    },
    close(refresh) {
      this.$emit('close', {refresh, refName: "reportWaterVol"});
    }
  },
  mounted() {
    if (this.type === 'update') {
      this.formData = JSON.parse(JSON.stringify(this.modalData));
    } else {
      this.formData['station_cd'] = this.station.stcd;
      if (this.station.type === 'pump') {
        autoWw(this.getPump__params_data).then(res => {
          if (res.status == 200 && res.obj) {
            this.formData.upstream_water_level = res.obj.pPupZ;
            this.formData.downstream_water_level = res.obj.pPuDwZ;
            this.formData.discharge = res.obj.mpQi
          }
        })
      } else {
        autoWw(this.getGate__params_data).then(res => {
          if (res.status == 200 && res.obj) {
            this.formData.upstream_water_level = res.obj.upZ;
            this.formData.downstream_water_level = res.obj.dwZ;
            this.formData.discharge = res.obj.gtq
          }
        })
      }
    }
  },
  computed: {
    publishWaterVol_params_data: function (params) {
      return {
        params: {
          action: "saveStationWwm"
        },

        data: this.formData
      }
    },

    updateWaterVol_params_data: function (params) {
      return {
        params: {
          action: "updateStationWwm"
        },
        data: {
          sw_cd: this.modalData.sw_cd,
          upstream_water_level: this.formData.upstream_water_level,
          downstream_water_level: this.formData.downstream_water_level,
          discharge: this.formData.discharge,
          open: this.formData.open,
          station_ww: this.formData.station_ww,
        }
      }
    },

    getPump__params_data: function (params) {
      return {
        action: "getPumpByStcdTm",
        stcd: this.station.stcd,
        time: this.$dayjs().format('YYYY-MM-DD')+ " 08"
      }
    },

    getGate__params_data: function (params) {
      return {
        action: "getGateRByStcdTm",
        stcd: this.station.stcd,
        time: this.$dayjs().format('YYYY-MM-DD')+ " 08"
      }
    }

  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addWaterVol{
  padding: 10px;
}
</style>