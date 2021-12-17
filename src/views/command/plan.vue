<template>
  <div id="plan">
    <div class="preView">
      <pdfView :height="'100%'" :src="'/dist/pdf/transfer_1_plan.pdf'"/>
    </div>
    <div class="upload">
      <a-input placeholder="请输入文件标题"></a-input>
      <a-upload-dragger
        class="uploadArea"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        
      >
        <p class="ant-upload-drag-icon">
          <icon-upload-one theme="outline" size="40" fill="#1890ff" :strokeWidth="3"/>
        </p>
        <p class="ant-upload-text">
          点击此处或将文件拖入此区域上传
        </p>
        <p class="ant-upload-hint">
          推荐使用谷歌Chrome、火狐FireFox、新版Edge浏览器 <br/>
          360、QQ等国产浏览器请切换为<b>急速模式</b>
        </p>
      </a-upload-dragger>

      <div class="btnGroup">
        <a-button type="primary">保存</a-button>
        <a-button>取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Upload, Button } from 'ant-design-vue';
import noData from "@/components/public/noData.vue";
import pdfView from "@/components/public/pdfView.vue";
export default {
  name: "plan",
  props: {},
  components: {
    AInput:Input,
    AUploadDragger:Upload.Dragger,
    AButton:Button,
    noData,
    pdfView
  },
  data() {
    return {
      pdfSrc: "/dist/pdf/transfer_1_plan.pdf"
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#plan{
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.preView {
  width: 70%;
  height: 100%;
  padding: 10px;
  border: 1px solid #00000021;
  border-radius: 5px;
}

.upload {
  width: calc(30% - 10px);
  .uploadArea {
    ::v-deep .ant-upload-drag {
      margin-top: 10px;
      height: 40%;
    }
  }
}

.btnGroup {
  margin-top: 10px;
  text-align: center;
  ::v-deep .ant-btn:not(:last-child) {
    margin-right: 20px;
  }
}
</style>