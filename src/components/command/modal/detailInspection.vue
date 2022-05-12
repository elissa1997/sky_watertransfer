<template>
  <div id="detailInspection">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="巡查主体">
        <div class="detail">
          <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="问题描述">
              <span>{{modalData.problem}}</span>
            </a-form-item>
            <a-form-item label="附件">
              <fileList :fileList="modalData.sendFileList"/>

            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="巡查回复" force-render>
        <div class="detail">
          <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="回复内容">
              <span v-if="modalData.status === '1'">{{modalData.replyContent}}</span>
              <span v-else>尚未回复</span>
            </a-form-item>
            <a-form-item label="回复时间">
              <span v-if="modalData.status === '1'">{{$dayjs(modalData.replyTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
              <span v-else>尚未回复</span>
            </a-form-item>
            <a-form-item label="回复附件">
              <fileList :fileList="modalData.replyFileList"/>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Button, Form, Tag, Tabs, } from 'ant-design-vue';
import { filePreview } from "@/network/command/filePreview.js";
import fileList from "@/components/public/fileList.vue";

export default {
  name: "detailInspection",
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
    ATag:Tag,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    fileList,
  },
  data() {
    return {
      file:[],
      replyFile:[],
      // fileSrc: undefined,
      // fileType: undefined,
      // replyFileSrc: undefined,
      // replyFileType: undefined,
    }
  },
  methods: {


    getFileSrc() {
      this.$nextTick(() => {
        if (this.modalData.sendFileId) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.fileSrc = url + "gateway/only.do?action=previewFile&file_cd="+this.modalData.sendFileId;
        }
        if (this.modalData.replyFileId) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.replyFileSrc = url + "gateway/only.do?action=previewFile&file_cd="+this.modalData.replyFileId;
        }
      })
    },
    getFileType(fileId,key) {
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
              switch(magic) {
                case 4022320623: 
                  (key === '1') ? that.fileType = "image" : that.replyFileType = "image"; 
                  break;
                case 4022320464: 
                  (key === '1') ? that.fileType = "image" : that.replyFileType = "image"; 
                  break;
                case 626017350: 
                  (key === '1') ? that.fileType = "pdf" : that.replyFileType = "pdf"; 
                  break;
              }
            }
          }
        })
      }
    },
    callback(key) {
      if (key === '1') {
        this.getFileType(this.modalData.sendFileId,key);
      } else {
        this.getFileType(this.modalData.replyFileId,key);
      }
    },
  },
  mounted() {
    // this.getFileSrc();
    // this.getFileType(this.modalData.sendFileId,'1');
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.detail{
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