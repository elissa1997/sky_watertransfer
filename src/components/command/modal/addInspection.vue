<template>
  <div id="addInspection">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="巡查单位"><a-tag>{{this.$userInfo.unitName_}}</a-tag></a-form-item>

      <a-form-item label="项目名称">
        <div>表单项</div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishInspection">保存</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { publish } from "@/network/command/inspection.js";
import { Button, Form, Input, Select, Tag } from 'ant-design-vue';
// import { unitConfig } from "@/config/unitList.js";

export default {
  name: "addInspection",
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
    ASelect:Select,
    ASelectOption:Select.Option,
    ASelectOptGroup:Select.OptGroup,
    ATag:Tag
  },
  data() {
    return {

      formData: {
        regCd: this.modalData.reg_cd,
        problem: undefined,
        unitList: undefined
      }
    }
  },
  methods: {
    // 获取接收单位列表


    publishInspection() {
      // 添加巡查内容成功后 执行关闭窗口示例
      // if (res.code === "1") {
      //   this.$message.success("添加成功")
      //   this.close(true);
      // }else if (res.code === "-1") {
      //   this.$message.warning("添加失败，请重试")
      // }

    },

    // 关闭子窗口，参数指定父窗口是否刷新
    close(refresh) {
      this.$emit('close', {refresh, refName: "inspection"});
    }
  },
  mounted() {

  },
  computed: {
    // 组装网络请求的 params、data
    // xxxx_params: function () {
    //   return {
    //     action: "transferUnitList",
    //   }
    // },
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addInspection{
  padding: 10px;
}
</style>