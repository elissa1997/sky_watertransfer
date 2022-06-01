<template>
  <div id="addSelfCheck">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="自检上报单位"><a-tag>{{this.$store.state.user.info.unitName_}}</a-tag></a-form-item>
      <a-form-item label="自检情况">
        <a-textarea v-model="formData.handleContent" placeholder="自检情况" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="pusblishSelfCheck">上报</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { publish } from "@/network/command/selfCheck.js";
import { Button, Form, Input, Tag } from 'ant-design-vue';
export default {
  name: "addSelfCheck",
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
    ATag:Tag
  },
  data() {
    return {
      formData: {
        regCd: this.modalData.reg_cd,
        receiveUnitCode: "10011027",
        receiveUnitName: "安徽省淮洪新河河道管理局",
        handleContent: undefined
      }
    }
  },
  methods: {
    close(refresh) {
      this.$emit('close', {refresh, refName: "selfCheck"});
    },

    pusblishSelfCheck() {
      publish(this.publishNotice_params_data.params, this.publishNotice_params_data.data).then(res => {
        if (res.code === "1") {
          this.$message.success("发布成功")
          this.close(true);
        }else if (res.code === "-1") {
          this.$message.warning("发布失败，请重试")
        }
      })
    }

  },
  mounted() {},
  computed: {
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
#addSelfCheck{
  padding: 10px;
}
</style>