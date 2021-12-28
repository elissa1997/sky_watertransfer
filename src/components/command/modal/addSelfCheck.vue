<template>
  <div id="addSelfCheck">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="自检上报单位"><a-tag>当前登录用户(下级站点单位)</a-tag></a-form-item>
      <a-form-item label="自检情况">
        <a-textarea placeholder="自检情况" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary">上报</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Button, Form, Input, Tag } from 'ant-design-vue';
export default {
  name: "addSelfCheck",
  props: {},
  components: {
    AButton:Button,
    AForm:Form,
    AFormItem:Form.Item,
    AInput:Input,
    ATextarea:Input.TextArea,
    ATag:Tag
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#addSelfCheck{
  padding: 10px;
}
</style>