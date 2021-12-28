<template>
  <div id="addNotice">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="发布单位"><a-tag>当前登录用户(上级管理单位)</a-tag></a-form-item>
      <a-form-item label="通知标题">
        <a-input placeholder="通知标题"/>
      </a-form-item>
      <a-form-item label="通知内容">
        <a-textarea placeholder="通知内容" :auto-size="{ minRows: 15, maxRows: 30 }"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary">发布</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Button, Form, Input, Tag } from 'ant-design-vue';

export default {
  name: "addNotice",
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
    return {

    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#addNotice{
  padding: 10px;
}
</style>