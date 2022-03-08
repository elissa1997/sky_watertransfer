<template>
  <div id="addNotice">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="发布单位"><a-tag>{{this.$userInfo.unitName_}}</a-tag></a-form-item>
      <a-form-item label="通知标题">
        <a-input v-model="formData.noticeName" placeholder="通知标题"/>
      </a-form-item>
      <a-form-item label="通知内容">
        <!-- <a-date-picker v-model="formData.dsTime"  style="width: 100%" show-time placeholder="选择调水时间" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss"/> -->
        <a-textarea v-model="formData.workContent" placeholder="通知内容" :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-item>
      <a-form-item label="文件上传" class="uploadArea">
        <a-upload-dragger
          name="file"
          :multiple="false"
          :file-list="formData.fileList" :remove="handleRemove" :before-upload="beforeUpload"
          accept=".pdf, .jpg, .png"
        >
          <p class="ant-upload-drag-icon">
            <icon-upload-one theme="outline" size="30" fill="#1890ff" :strokeWidth="3"/>
          </p>
          <p class="ant-upload-text">
            点击此处或将文件拖入此区域上传
          </p>
          <p class="ant-upload-hint">
            推荐使用谷歌Chrome、火狐FireFox、新版Edge浏览器 <br/>
            360、QQ等国产浏览器请切换为<b>急速模式</b>
          </p>
        </a-upload-dragger>
      </a-form-item>
      <!-- <a-form-item label="工作要求">
        <a-textarea v-model="formData.workRequirement" placeholder="工作要求" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item> -->
      <a-form-item label="接收单位" v-if="unit.unitTree">
        <div class="tree">
          <a-tabs default-active-key="1" style="width: 100%;">
            <a-tab-pane key="1" tab="接收单位">
              <a-tree
                checkable
                defaultExpandParent
                :replace-fields="replaceFields"
                :tree-data="unit.unitTree"
                @check="treeCheck"
              >
              </a-tree>
            </a-tab-pane>

            <a-tab-pane key="2" tab="短信接收人" v-if="unit.sendSMS">
              <a-checkbox-group @change="contactsChange" style="padding: 10px">
                <a-checkbox v-for="people in unit.contactsList" :key="people.id" :value="people.tel">{{people.name}}</a-checkbox>
              </a-checkbox-group>
            </a-tab-pane>
            <div slot="tabBarExtraContent" style="margin-right: 10px;display: flex;align-items: center;"> 短信提醒 &nbsp; <a-switch v-model="unit.sendSMS"/> </div>
          </a-tabs>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishNotice">发布</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>

    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button, Form, Input, Upload, Tag, Select, Tree, Tabs, Switch, Checkbox } from 'ant-design-vue';
import { receiveUnit, contacts } from "@/network/command/receiveUnit.js";
import { publish } from "@/network/command/notice.js"
import { listToTree } from "@/util/listToTree.js";
// import { dictTrans } from "@/util/readLocalData.js";
export default {
  name: "addNotice",
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
    AUploadDragger:Upload.Dragger,
    ATextarea:Input.TextArea,
    ATag:Tag,
    ASelect:Select,
    ASelectOption:Select.Option,
    ATree:Tree,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    ASwitch:Switch,
    ACheckbox:Checkbox,
    ACheckboxGroup:Checkbox.Group,
  },
  data() {
    return {
      formData: {
        regCd: this.modalData.reg_cd,
        noticeName: undefined,
        workContent: undefined,
        fileList: [],
        noticeOrgList: undefined,
        SMS: {
          list: undefined,
          // message: "您好,安徽水利 {} 在节水调水平台给你单位发送了调水预通知 {} ,请及时查收!",
          sendUser: this.$userInfo.username_
        }
      },
      unit: {
        sendSMS: true,
        unitTree: undefined,
        tempList: [],
        contactsList: undefined
      },
      replaceFields: {
        children: 'children',
        title: 'unitname',
        key: 'unitcode'
      }
    }
  },
  methods: {
    // 获取接收单位列表
    getReceiveUnit() {
      receiveUnit(this.getReceiveUnit_params).then(res => {
        if (res.data && res.data.length) {
          this.unit.tempList = res.data;
          this.unit.unitTree = listToTree(res.data, "unitcode", "parent_unitcode", "1001")
        }
      })
    },

    // 树点击
    treeCheck(checkedKeys, e) {
      let allCheck = [...checkedKeys,...e.halfCheckedKeys];
      // console.log(allCheck);
      this.formData.noticeOrgList = "";
      let temp = [];
      allCheck.forEach(element => {
        if (element != "10011027") {
          temp.push(
            (this.unit.tempList.find(o => o.unitcode === String(element))).unitcode + "," +
            (this.unit.tempList.find(o => o.unitcode === String(element))).unitname + "#"
          )
        }
      });
      this.formData.noticeOrgList = temp.join("");
      this.getContacts(allCheck);

    },

    // 获取短信接收人
    getContacts(unitList) {
      let unitCodes = unitList.filter(function(item) {
          return item != "10011027"
      });

      unitCodes = unitCodes.join(",")

      contacts({action: "contactList", unitCodes}).then(res => {
        if (res.code === "1") {
          this.unit.contactsList = [];
          this.unit.contactsList = res.data;
        }
      })
    },

    // 联系人点击
    contactsChange(val) {
      if (val.length) {
        this.formData.SMS.list = val.join(",");
      }else{
        this.formData.SMS.list = undefined;
      }
    },


    handleRemove(file) {
      const index = this.formData.fileList.indexOf(file);
      const newFileList = this.formData.fileList.slice();
      newFileList.splice(index, 1);
      this.formData.fileList = newFileList;
    },
    beforeUpload(file) {
      console.log(file.type);
      if (this.formData.fileList.length >= 1) {
          this.$message.warning("请先删除已选择/已上传文件");
        
      }else{
          
        if (file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpeg") {
          this.formData.fileList = [...this.formData.fileList, file];
        }else{
          this.$message.warning("请上传PDF或图片类型文件");
        }
      }
      return false;
    },

    // 发布通知
    publishNotice() {
      // publish(this.publishNotice_params_data.params, this.publishNotice_params_data.data).then(res => {
      //   if (res.code === "1") {
      //     this.$message.success("发布成功")
      //     this.close(true);
      //   }else if (res.code === "-1") {
      //     this.$message.warning("发布失败，请重试")
      //   }
      // })
      const { formData } = this;
      const formDataObj = new FormData();
      formDataObj.append('regCd', this.modalData.reg_cd);
      formDataObj.append('noticeName', this.formData.noticeName);
      formDataObj.append('workContent', this.formData.workContent);
      formDataObj.append('unitstrs', this.formData.noticeOrgList);
      formDataObj.append('initUnitCode', this.$userInfo.unitCode_);
      formDataObj.append('initUnitName', this.$userInfo.unitName_);

      if (this.unit.sendSMS) {
        formDataObj.append('sendFlag', "1");
        formDataObj.append('telstrs', this.formData.SMS.list);
        formDataObj.append('message', this.SMSContent);
        formDataObj.append('sendUser', this.formData.SMS.sendUser);
      }else{
        formDataObj.append('sendFlag', "0");
      }

      formData.fileList.forEach(file => {
        formDataObj.append('file', file);
      });
      publish({ action: "saveNotice" }, formDataObj).then(res => {
        if (res.code === "1") {
          this.$message.success("发布成功")
          this.close(true);
        }
      })

    },

    close(refresh) {
      this.$emit('close', {refresh, refName: "notice"});
    }

  },
  mounted() {
    this.getReceiveUnit();
  },
  computed: {
    getReceiveUnit_params: function () {
      return {
        action: "transferUnitList",
      }
    },

    publishNotice_params_data: function (params) {
      return {
        params: {
          action: "doAdd"
        },

        data: this.formData
      }
    },

    SMSContent: function (params) {
      return `您好,${this.$userInfo.unitName_}${this.$userInfo.realName_}在节水调水平台给你单位发送了调水预通知《${this.formData.noticeName || ''}》,请及时查收!`
    }


  },
  watch: {
    'unit.sendSMS': {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.formData.SMS.list = undefined
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
#addNotice{
  padding: 10px;
}

.uploadArea {
  ::v-deep .ant-upload-drag {
    height: 140px !important;
  }

  ::v-deep .ant-upload.ant-upload-drag p.ant-upload-drag-icon {
    margin-bottom: 0px !important;
  }


}

.tree {
  border: 1px solid #00000021;
  border-radius: 5px;
  // padding: 10px;
  height: 150px;
  overflow-y: auto;

  ::v-deep .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }

  ::v-deep .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}
</style>