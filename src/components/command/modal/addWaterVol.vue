<template>
  <div id="addWaterVol">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="监测站点">
        <a-tag>{{this.$userInfo.unitName_}}</a-tag>
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

      <a-form-item label="累计引提水量">
        <a-input v-model="formData.station_ww" placeholder="填写累计引提水量" addonAfter="万m³"></a-input>
      </a-form-item>

      <a-form-item label="填报时间">
        <a-date-picker v-model="formData.ts" show-time format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 10, offset: 3 }">
        <a-button type="primary" v-if="record" @click="updateWaterVol">保存修改</a-button>
        <a-button type="primary" v-else @click="publishWaterVol">保存</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
    <!-- {{record}} -->
  </div>
</template>

<script>
import { publish, update } from "@/network/command/reportWaterVol.js"
import { Button, Form, Input,  Tag, DatePicker } from 'ant-design-vue';

export default {
  name: "addWaterVol",
  props: {
    modalData: {
      type: Object,
      default: undefined
    },
    record: {
      type: Object,
      default: undefined
    },
  },
  components: {
    AButton:Button,
    AForm:Form,
    AFormItem:Form.Item,
    AInput:Input,
    ATextarea:Input.TextArea,

    ATag:Tag,
    ADatePicker:DatePicker
  },
  data() {
    return {
      
      formData: {
        reg_cd: this.modalData.reg_cd,
        station_cd: this.modalData.stcd,
        upstream_water_level: undefined,
        downstream_water_level: undefined,
        discharge: undefined,
        open: undefined,
        station_ww: undefined,
        ts: this.$dayjs().format("YYYY-MM-DD HH:mm:ss")
      }
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

    close(refresh) {
      this.$emit('close', {refresh, refName: "reportWaterVol"});
    }
  },
  mounted() {
    if (this.record) {
      this.formData = this.record;
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
          station_ww: this.formData.station_ww,
          sw_cd: this.record.sw_cd
        }
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