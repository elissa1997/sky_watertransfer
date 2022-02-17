<template>
  <div id="addNotice">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="发布单位"><a-tag>当前登录用户(上级管理单位)</a-tag></a-form-item>
      <a-form-item label="通知标题">
        <a-input v-model="formData.noticeName" placeholder="通知标题"/>
      </a-form-item>
      <a-form-item label="调水时间">
        <a-date-picker v-model="formData.dsTime"  style="width: 100%" show-time placeholder="选择调水时间" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss"/>
        <!-- <a-textarea v-model="formData.dsTime" placeholder="通知内容" :auto-size="{ minRows: 15, maxRows: 30 }"/> -->
      </a-form-item>
      <a-form-item label="工作内容">
        <a-textarea v-model="formData.workContent" placeholder="工作内容" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item label="工作要求">
        <a-textarea v-model="formData.workRequirement" placeholder="工作要求" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item label="接收单位" v-if="unitObj">
        <a-select style="width: 100%" mode="multiple" @change="selectChange" placeholder="请下拉勾选单位">
          <a-select-option v-for="item in unitObj" :key="item.unitcode">
            {{item.unitname}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishNotice">发布</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>

    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button, Form, Input, Tag, Select, DatePicker } from 'ant-design-vue';
import { receiveUnit } from "@/network/command/receiveUnit.js";
import { publish } from "@/network/command/notice.js"
// import { dictTrans } from "@/util/readLocalData.js";
export default {
  name: "addNotice",
  props: {
    modalData: {
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
    ASelect:Select,
    ASelectOption:Select.Option,
    ADatePicker:DatePicker
  },
  data() {
    return {
      formData: {
        regCd: this.modalData.reg_cd,
        noticeName: undefined,
        workContent: undefined,
        workRequirement: undefined,
        dsTime: this.$dayjs().format("YYYY-MM-DD HH:mm:ss"),
        noticeOrgList: undefined
      },
      unitObj: undefined
    }
  },
  methods: {
    // 获取接收单位列表
    getReceiveUnit() {
      receiveUnit(this.getReceiveUnit_params).then(res => {
        // this.unitObj = this.groupbyUnit(res.data, "type");
        this.unitObj = res.data;
      })
    },

    // groupbyUnit(array, key) {
    //   return array.reduce(function(prev, cur) {
    //       (prev[cur[key]] = prev[cur[key]] || []).push(cur);
    //       return prev;
    //   }, {});
    // },

    // async getDictObj(key) {
    //   let obj = await dictTrans("unitType", "key", key); 
    //   return obj;
    // },

    // 响应接收单位选择
    selectChange(value, option) {
      this.formData.noticeOrgList = []
      value.forEach(element => {
        this.formData.noticeOrgList.push(
          {
            receiveUnitCode: (this.unitObj.find(o => o.unitcode === String(element))).unitcode,
            receiveUnitName: (this.unitObj.find(o => o.unitcode === String(element))).unitname

          }
        )
        console.log(this.unitObj.find(o => o.unitcode === String(element)))
        
      });
    },

    // 发布通知
    publishNotice() {
      publish(this.publishNotice_params_data.params, this.publishNotice_params_data.data).then(res => {
        if (res.code === "1") {
          this.$message.success("发布成功")
          this.close(true);
        }else if (res.code === "-1") {
          this.$message.warning("发布失败，请重试")
        }
        // console.log(res);
      })
    },

    close(refresh) {
      this.$emit('close', {refresh, refName: "notice"});
    }

  },
  mounted() {
    this.getReceiveUnit();
  },
  computed: {
    getReceiveUnit_params: function (params) {
      return {
        action: "transferUnitList",
        type: "C"
      }
    },

    publishNotice_params_data: function (params) {
      return {
        params: {
          action: "doAdd"
        },

        data: this.formData
      }
    }

  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addNotice{
  padding: 10px;
}
</style>