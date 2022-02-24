<template>
  <div id="plan">

    <div class="preView" :style="{width:(this.$userInfo.type === 'A')?'70%':'100%'}">
      <pdfView v-if="uploaded && pdfSrc" :height="'100%'" :src="pdfSrc"/>
      <noData v-else/>
    </div>
    <div class="upload" v-if="this.$userInfo.type === 'A'">
      <a-input v-model="upload.planName" placeholder="请输入文件标题或选择文件后自动填写"></a-input>
      <a-upload-dragger
        class="uploadArea"
        name="file"
        :multiple="false"
        :file-list="upload.fileList" :remove="handleRemove" :before-upload="beforeUpload"
        accept=".pdf"
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
        <a-button type="primary" :disabled="upload.fileList.length === 0" :loading="upload.uploading" @click="handleUpload">保存</a-button>
        <a-button>取消</a-button>
        <!-- <a-button @click="testUpload">测试上传完成</a-button> -->
      </div>
    <!-- {{regData}} -->

    </div>
  </div>
</template>

<script>
import { Input, Upload, Button } from 'ant-design-vue';
import noData from "@/components/public/noData.vue";
import pdfView from "@/components/public/pdfView.vue";
import { uploadPlan, listPlan } from "@/network/command/plan.js";
export default {
  name: "plan",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {
    AInput:Input,
    AUploadDragger:Upload.Dragger,
    AButton:Button,
    noData,
    pdfView
  },
  data() {
    return {
      pdfSrc: undefined,
      uploaded: undefined, //已上传文件
      upload: {
        planName: undefined,
        fileList: [],
        uploading: false,
      }
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.upload.fileList.indexOf(file);
      const newFileList = this.upload.fileList.slice();
      newFileList.splice(index, 1);
      this.upload.fileList = newFileList;
    },
    beforeUpload(file) {
      if (this.upload.fileList.length >= 1) {
          this.$message.warning("请先删除已选择/已上传文件");
        
      }else{
          
        if (file.type === "application/pdf") {
          this.upload.fileList = [...this.upload.fileList, file];
          this.upload.planName = file.name;
        }else{
          this.$message.warning("请上传PDF类型文件");
        }
      }
      return false;
    },
    handleUpload() {
      const { upload } = this;
      const formData = new FormData();
      formData.append('planName', this.upload.planName);
      formData.append('endTime', '2021-12-02 20:10:32');
      formData.append('recordUnitCode', '1001');
      formData.append('recordUnitName', '	安徽省水利厅');
      formData.append('regCd', this.regData.reg_cd);

      upload.fileList.forEach(file => {
        formData.append('file', file);
      });
      this.upload.uploading = true;
      uploadPlan(formData, { action: "doAdd" }).then(res => {
        if (res.code === "1") {
          this.upload.uploading = false;
          this.getPlanList();
        }
      })
    },

    getPlanList() {
      listPlan(this.getPlanList_params).then(res => {
        if (res.data.length) {
          this.uploaded = res.data[0];
        }
        // console.log(res.data[0], this.uploaded);
      }).finally(() => {
        this.pdfSrc = undefined;
        if (this.uploaded) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.pdfSrc = url + "gateway/only.api?action=previewFile&file_cd="+this.uploaded.fileId
          console.log(this.pdfSrc);
        }
      })
    },

    testUpload() {
      console.log(this.upload.fileList[0])
      this.upload.fileList[0].status = "done";
    }
  },
  mounted() {
    this.getPlanList();
  },
  computed: {
    getPlanList_params: function (params) {
      return {
        action: "list",
        recordUnitCode: "1001",
        regCd: this.regData.reg_cd,

      }
    }
  },
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
  // width: 70%;
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