<template>
  <div id="detailExecute">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="指令发布单位">
        <span>{{modalData.createUnitName}}</span>
      </a-form-item>

      <a-form-item label="指令接收单位">
        <span>{{modalData.instructionRef.unitName}}</span>
      </a-form-item>

      <a-form-item label="指令接收状态">
        <!-- <span>{{modalData.instructionRef.unitName}}</span> -->
        <a-tag :color="(modalData.instructionRef.zt === '0')?'orange':'green'">
          {{(modalData.instructionRef.zt === '0')?'暂未确认':'确认收到'}}
        </a-tag>
      </a-form-item>

      <a-form-item label="指令内容">
        <span>{{modalData.content}}</span>
      </a-form-item>

      <a-form-item label="附件预览">
        <div v-if="fileType" class="file">
          <img v-if="fileType === 'image'" :src="fileSrc">
          <embed v-if="fileType === 'pdf'" :src="fileSrc" width="100%" height="100%">
        </div>

        <span v-else>暂无附件</span>
      </a-form-item>
    </a-form>

    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button, Form, Tag } from 'ant-design-vue';
import { filePreview } from "@/network/command/filePreview.js";
export default {
  name: "detailExecute",
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
    ATag:Tag
  },
  data() {
    return {
      fileSrc: undefined,
      fileType: undefined,
    }
  },
  methods: {
    getFileSrc() {
      this.$nextTick(() => {
        // console.log(this.modalData.fileId)
        if (this.modalData.fileId) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.fileSrc = url + "gateway/only.do?action=previewFile&file_cd="+this.modalData.fileId;
        }
      })
    },

    getFileType(fileId) {
      let that = this;
      if (fileId) {
        filePreview({action: "previewFile", file_cd: fileId}).then(res => {
          if (res) {
            let blob = new Blob([res]);
            let reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onload = function(e) {
              let buffer = reader.result;
              // 将这四个字节的内容，视作一个32位整数
              let view = new DataView(buffer);
              let magic = view.getUint32(0, false);
              console.log(magic)
              switch(magic) {
                case 4022320623: that.fileType = "image"; break;
                case 4022320464: that.fileType = "image"; break;
                case 626017350: that.fileType = "pdf"; break;
              }
  
            }
          }
        })
        
      }
    }
  },
  mounted() {
    this.getFileSrc();
    this.getFileType(this.modalData.fileId);
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#detailExecute{
  padding: 10px;
}

.file {
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>