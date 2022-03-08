<template>
  <div id="plan">

    <div class="preView" :style="{width:(this.$userInfo.type === 'A')?'70%':'100%'}">
      <a-button class="receiveBtn" type="primary" @click="handleReceive" v-if="loggedInreceiveUnit && this.$userInfo.type != 'A'" :disabled="loggedInreceiveUnit.zt === '1'">
        {{(loggedInreceiveUnit.zt === '0')?'确认签收':'已签收'}} 
      </a-button>

      <pdfView v-if="uploaded && pdfSrc" :height="'100%'" :src="pdfSrc"/>
      <noData v-else/>
    </div>
    <a-tabs default-active-key="1" style="width: calc(30% - 10px);" v-if="this.$userInfo.type === 'A'">
      <a-tab-pane key="1" tab="发布方案">
        <div class="upload">
          <a-input v-model="upload.planName" placeholder="请输入文件标题或选择文件后自动填写"></a-input>

          <a-upload
            name="file"
            :multiple="false"
            :file-list="upload.fileList" :remove="handleRemove" :before-upload="beforeUpload"
            accept=".pdf"
          >
            <a-button block class="btnInnerCenter"> 
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
      <a-tab-pane key="2" tab="签收情况" force-render>
        <a-table bordered class="receiveTable" v-if="uploaded" :columns="receiveUnitColums" :data-source="uploaded.planExtList" rowKey="id" :pagination="false" size="middle" >
          <a-tag :color="(zt === '0')?'orange':'green'" slot="zt" slot-scope="zt">
            {{(zt === "0")?'暂未确认':'确认收到'}}
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
import { uploadPlan, listPlan, recivePlan } from "@/network/command/plan.js";
export default {
  name: "plan",
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
      receiveUnitColums: [
        { title: '接收单位', dataIndex: 'unitName' },
        { title: '状态', dataIndex: 'zt', scopedSlots: { customRender: 'zt' }, align: "center" },
        // { title: '时间', dataIndex: 'ts',scopedSlots: { customRender: 'ts' }, align: "center" },
      ],
      loggedInreceiveUnit: undefined,
      upload: {
        planName: undefined,
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
      formData.append('regCd', this.regData.reg_cd);
      formData.append('planName', this.upload.planName);
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
      uploadPlan(formData, { action: "saveTransferPlan" }).then(res => {
        if (res.code === "1") {
          this.upload.uploading = false;
          this.getPlanList();
        }
      })
    },

    // 获取已上传方案
    async getPlanList() {
      await listPlan(this.getPlanList_params).then(res => {
        if (res.data) {
          this.uploaded = res.data;
        }
        // console.log(res.data[0], this.uploaded);
      }).finally(() => {
        this.pdfSrc = undefined;
        if (this.uploaded) {
          let url = undefined;
          (this.$env === "development")?url = "/local/": url = "/ahjs/";
          this.pdfSrc = url + "gateway/only.do?action=previewFile&file_cd="+this.uploaded.fileId
          console.log(this.pdfSrc);
        }
      })
    },

    // 从已上传方案的签收单位列表中查找当前用户信息
    checkReciveStatus() {
      console.log(this.uploaded);
      if (this.uploaded) {
        for (let index = 0; index < this.uploaded.planExtList.length; index++) {
          const element = this.uploaded.planExtList[index];
          if (element.unitCode === this.$userInfo.unitCode_) {
            // console.log(element);
            this.loggedInreceiveUnit = element
          }
        }
      }
    },

    // 接收单位树更改
    unitChange(unitStringList) {
      if (unitStringList.length) {
        this.upload.unitList = unitStringList.join(",");
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
        this.uploaded.SMS.list = undefined;
      }
      // console.log(contactsList);
    },

    // 点击签收
    handleReceive() {
        for (let index = 0; index < this.uploaded.planExtList.length; index++) {
          const element = this.uploaded.planExtList[index];
          if (element.unitCode === this.$userInfo.unitCode_) {
            // console.log(element);
            recivePlan(this.handleReceive_params(element.id)).then(res => {
              // console.log(res);
            }).finally(async () => {
              await this.getPlanList();
              this.checkReciveStatus();
            })
            // return element;
          }
        }
      
    },


  },
  async mounted() {
    await this.getPlanList();
    this.checkReciveStatus();
  },
  computed: {

    getPlanList_params: function (params) {
      return {
        action: "getWaterTransferPlanByRegCd",
        // recordUnitCode: "1001",
        regCd: this.regData.reg_cd,

      }
    },
    handleReceive_params: function () {
      return function (id) {
        return {
          action: "confirmWaterTransferPlan",
          id 
        }
      }
    },
    SMSContent: function (params) {
      return `您好,${this.$userInfo.unitName_}${this.$userInfo.realName_}在节水调水平台给你单位发送了调水方案《${this.upload.planName || ''}》,请及时查收!`
    }
  },
  watch: {

  }
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
  position: relative;

  .receiveBtn {
    position: absolute;
    top: 20px;
    left: 20px;
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
  height: 690px;
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