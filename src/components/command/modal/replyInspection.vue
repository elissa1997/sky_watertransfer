<template>
  <div id="replyInspection">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="问题回复">
        <a-textarea v-model="formData.replyContent" placeholder="问题描述" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item label="附件">
        <a-upload name="file" :multiple="false"
          :file-list="formData.fileList" :remove="handleRemove" :before-upload="beforeUpload"
          accept=".pdf,.jpeg,.png">
          <a-button block class="btnInnerCenter"> 
            <icon-upload-one theme="outline" size="16" fill="#9b9b9b" :strokeWidth="3"/>选择文件 
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="replyInspection">保存</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { Button, Form, Input, Select, Tag, Upload, TreeSelect} from 'ant-design-vue';
import { publish } from "@/network/command/inspection.js";


export default {
  name: "replyInspection",
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
    ATag:Tag,
    AUpload:Upload,
    ATreeSelect:TreeSelect,
  },
  data() {
    return {
      formData: {
        replyContent: undefined,
        fileList: [],
      },
    }
  },
  methods: {
    replyInspection(){
      const formDataObj = new FormData();
      formDataObj.append('id', this.modalData.id);
      formDataObj.append('replyContent', this.formData.replyContent);
      formDataObj.append('status', "1");
      this.formData.fileList.forEach(file => {
        formDataObj.append('file', file);
      });
      publish({ action: "replyUrge"}, formDataObj).then(res => {
        if (res.code === "1") {
          this.$message.success("回复成功")
          this.close(true);
        }
      })
    },
    handleRemove(file) {
      const index = this.formData.fileList.indexOf(file);
      const newFileList = this.formData.fileList.slice();
      newFileList.splice(index, 1);
      this.formData.fileList = newFileList;
    },
    beforeUpload(file) {

      if (file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png") {
        this.formData.fileList = [...this.formData.fileList, file];
      }else{
        this.$message.warning("请上传PDF或图片类型文件");
      }
      
      return false;
    },
    // 关闭子窗口，参数指定父窗口是否刷新
    close(refresh) {
      this.$emit('close', {refresh, refName: "inspection"});
    },
  },
  mounted() {
   
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#replyInspection{
  padding: 10px;
}
</style>