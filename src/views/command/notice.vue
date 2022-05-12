<template>
  <div id="notice">
    <div class="preView" :style="{width:$hasPermission(this.$userInfo.type, 'AE')?'70%':'100%'}">
      <pdfView v-if="uploaded && pdfSrc" :height="$hasPermission(this.$userInfo.type, 'AE')?'100%':'calc(100% - 32px)'" :src="pdfSrc"/>
      <noData v-else/>
      <a-button class="receiveBtn" type="primary" @click="handleReceive" v-if="loggedInreceiveUnit && $hasPermission(this.$userInfo.type, 'BCD')" :disabled="loggedInreceiveUnit.status === '1'">
        {{(loggedInreceiveUnit.status === '0')?'确认签收':'已签收'}} 
      </a-button>
    </div>

    <a-tabs default-active-key="1" style="width: calc(30% - 10px);" v-if="$hasPermission(this.$userInfo.type, 'AE')">
      <a-tab-pane key="1" tab="发布方案"  v-if="$hasPermission(this.$userInfo.type, 'A')">
        <div class="upload">
          <a-input v-model="upload.noticeName" placeholder="请输入文件标题或选择文件后自动填写"></a-input>

          <a-upload
            name="file"
            :multiple="false"
            :file-list="upload.fileList" :remove="handleRemove" :before-upload="beforeUpload"
            accept=".pdf"
          >
            <a-button type="primary" block class="btnInnerCenter"> 
              <icon-upload-one theme="outline" size="16" fill="#9b9b9b" :strokeWidth="3"/> 
              点击选择文件 
            </a-button>
          </a-upload>
          <div class="receiveTree">
            <unitAndContacsList @unitChange="unitChange" @contactsChange="contactsChange" @isSendSMS="isSendSMS"/>
          </div>

          <div class="btnGroup">
            <a-button type="primary" :disabled="upload.fileList.length === 0" :loading="upload.uploading" @click="handleUpload">保存</a-button>
            <a-button>取消</a-button>
          </div>

        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="签收情况"  v-if="$hasPermission(this.$userInfo.type, 'AE')">
        <a-table bordered class="receiveTable" v-if="uploaded" :columns="receiveUnitColums" :data-source="uploaded.noticeOrgList" rowKey="id" :pagination="false" size="middle" >
          <a-tag :color="(status === '0')?'orange':'green'" slot="status" slot-scope="status">
            {{(status === "0")?'暂未确认':'确认收到'}}
          </a-tag>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Select, Input, Upload, Button, Table, Tag, Tabs } from 'ant-design-vue';
import unitAndContacsList from "@/components/command/unitAndContacsList.vue";
import noData from "@/components/public/noData.vue";
import pdfView from "@/components/public/pdfView.vue";
import { noticeContent, reciveNotice ,publish } from "@/network/command/notice.js";

export default {
  name: "notice",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {
    ASelect:Select,
    ASelectOption:Select.Option,
    ASelectOptGroup:Select.OptGroup,
    AInput:Input,
    AUpload:Upload,
    AButton:Button,
    ATable:Table,
    ATag:Tag,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    unitAndContacsList,
    noData,
    pdfView
  },
  data() {
    return {
      pdfSrc: undefined,
      uploaded: undefined, //已上传文件

      receiveUnitColums:[
        { title: '确认收到单位', dataIndex: 'receiveUnitName' },
        { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' } },
      ],
      
      loggedInreceiveUnit: undefined,
      upload: {
        noticeName: undefined,
        fileList: [],
        uploading: false,
        unitList: undefined,
        SMS: {
          isSend: true,
          list: undefined,
          sendUser: this.$userInfo.username_
        }
      },
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
          this.upload.noticeName = file.name;
        }else{
          this.$message.warning("请上传PDF类型文件");
        }
      }
      return false;
    },

    handleUpload() {
      const { upload } = this;
      const formData = new FormData();
      formData.append('regCd', this.regData.reg_cd);
      formData.append('noticeName', this.upload.noticeName);
      // formData.append('endTime', '2021-12-02 20:10:32');
      formData.append('recordUnitCode', '1001');
      formData.append('recordUnitName', '安徽省水利厅');
      formData.append('unitstrs', this.upload.unitList);
      formData.append('author', this.$userInfo.username_);
      formData.append('authorName', this.$userInfo.realName_);
      formData.append('initUnitCode', this.$userInfo.unitCode_);
      formData.append('initUnitName', this.$userInfo.unitName_);

      if (this.upload.SMS.isSend) {
        formData.append('sendFlag', "1");
        formData.append('telstrs', this.upload.SMS.list);
        formData.append('message', this.SMSContent);
        formData.append('sendUser', this.upload.SMS.sendUser);
      }else{
        formData.append('sendFlag', "0");
      }


      
      if (this.uploaded) {
        formData.append('id', this.uploaded.id);
      }

      upload.fileList.forEach(file => {
        formData.append('file', file);
      });
      this.upload.uploading = true;
      publish({ action: "saveNotice" }, formData).then(res => {
        if (res.code === "1") {
          this.upload.uploading = false;
          this.getNoticeContent();
        }
      })
    },

    async getNoticeContent() {
      await noticeContent(this.getNoticeContent_params).then(res => {
        if (res.data) {
          this.uploaded = res.data[0];
        }
      }).finally(() => {
        if (this.uploaded) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.pdfSrc = url + "gateway/only.do?action=previewFile&file_cd="+this.uploaded.fileId
          console.log(this.pdfSrc);
        }
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getNoticeContent();
    },

    // 从已上传方案的签收单位列表中查找当前用户信息
    checkReciveStatus() {
      console.log(this.uploaded);
      if (this.uploaded) {
        for (let index = 0; index < this.uploaded.noticeOrgList.length; index++) {
          const element = this.uploaded.noticeOrgList[index];
          if (element.receiveUnitCode === this.$userInfo.unitCode_) {
            // console.log(element);
            this.loggedInreceiveUnit = element
          }
        }
      }
    },

    // 接收单位树更改
    unitChange(unitStringList) {
      if (unitStringList.length) {
        this.upload.unitList = unitStringList.join("");
      }
      // console.log(unitStringList);
    },

    // 是否开启短信接收人
    isSendSMS(enable) {
      if (!enable) {
        this.upload.SMS.list = null;
        this.upload.SMS.isSend = false;
      }else {
        this.upload.SMS.isSend = true;
      }
    },

    // 短信接收人更改
    contactsChange(contactsList) {
      if (contactsList && contactsList.length) {
        this.upload.SMS.list = contactsList.join(",");
      }else {
        this.upload.SMS.list = undefined;
      }
      // console.log(contactsList);
    },

    // 点击签收
    handleReceive() {
        for (let index = 0; index < this.uploaded.noticeOrgList.length; index++) {
          const element = this.uploaded.noticeOrgList[index];
          if (element.receiveUnitCode === this.$userInfo.unitCode_) {
            // console.log(element);
            reciveNotice(this.handleReceive_params(element.id)).then(res => {
              // console.log(res);
            }).finally(async () => {
              await this.getNoticeContent();
              this.checkReciveStatus();
            })
            // return element;
          }
        }
      
    },
  },
  async mounted() {
    await this.getNoticeContent();
    this.checkReciveStatus();

  },
  computed: {
    getNoticeContent_params: function (params) {
      return {
        action: "sendNoticeList",
        regCd: this.regData.reg_cd
      }
    },
    handleReceive_params: function () {
      return function (id) {
        return {
          action: "confirmNotice",
          id 
        }
      }
    },
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#notice{
  display: flex;
  justify-content: space-between;
  height: 100%;

}
.preView {
  // width: 70%;
  height: 100%;
  padding: 10px;
  border: 1px solid #00000021;
  border-radius: 5px;
  position: relative;

  .receiveBtn {
    // position: absolute;
    // top: 20px;
    // left: 20px;
  }
}

.upload {
  margin-top: 10px;
  width: 100%;

  .btnInnerCenter {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    ::v-deep .i-icon {
      margin-right: 5px;
    }
  }

  .receiveTree {
    margin-top: 10px;

  }



  ::v-deep .ant-upload.ant-upload-select {
    display: unset;
  }

  // ::v-deep .ant-upload.ant-upload-drag p.ant-upload-drag-icon {
  //   margin-bottom: 0px !important;
  // }

}

.receiveTable {
  margin-top: 10px;
  height: calc(90vh - 175px);
  overflow-y: auto;
}

.btnGroup {
  margin-top: 10px;
  text-align: center;
  ::v-deep .ant-btn:not(:last-child) {
    margin-right: 20px;
  }
}
</style>