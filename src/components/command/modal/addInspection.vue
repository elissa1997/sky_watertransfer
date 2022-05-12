<template>
  <div id="addInspection">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="问题描述">
        <a-textarea v-model="formData.problem" placeholder="问题描述" :auto-size="{ minRows: 5, maxRows: 15 }"/>
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
      <a-form-item label="接收单位">
        <a-tree-select treeCheckStrictly tree-checkable @change="treeSelect"
            :tree-data="unitTreeData" :replace-fields="replaceFields"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishInspection">保存</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { publish } from "@/network/command/inspection.js";
import { Button, Form, Input, Select, Tag, Upload, TreeSelect} from 'ant-design-vue';
// import { unitConfig } from "@/config/unitList.js";
import { receiveUnit, contacts } from "@/network/command/receiveUnit.js";
import { listToTree } from "@/util/listToTree.js";

export default {
  name: "addInspection",
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
        regCd: this.modalData.reg_cd,
        problem: undefined,
        fileList: [],
        unitstrs: undefined,
      },
      tempUnitList: [],
      unitTreeData:undefined,
      replaceFields: {
        children: 'children',
        title: 'unitname',
        key: 'unitcode',
        value: 'unitcode'
      }
    }
  },
  methods: {
    // 获取接收单位列表
    getReceiveUnit() {
      receiveUnit(this.getReceiveUnit_params).then(res => {
        if (res.data && res.data.length) {
          this.tempUnitList = res.data;
          this.unitTreeData = listToTree(res.data, "unitcode", "parent_unitcode")
        }   
      })
    },
    treeSelect(value, label, extra) {
      let allCheck = extra.allCheckedNodes;
      this.formData.unitstrs = "";
      let temp = [];
      allCheck.forEach(item => {
        if (item.key != "10011027") {
          temp.push(
            (this.tempUnitList.find(o => o.unitcode === String(item.key))).unitcode + "," +
            (this.tempUnitList.find(o => o.unitcode === String(item.key))).unitname + "#"
          )
        }
      });
      this.formData.unitstrs = temp.join("");
    },
    // 获取接收单位列表
    publishInspection() {
      const formDataObj = new FormData();
      formDataObj.append('regCd', this.formData.regCd);
      formDataObj.append('problem', this.formData.problem);
      formDataObj.append('unitstrs', this.formData.unitstrs);
      formDataObj.append('urgeUnitCode', this.$userInfo.unitCode_);
      formDataObj.append('urgeUnitName', this.$userInfo.unitName_);
      this.formData.fileList.forEach(file => {
        formDataObj.append('file', file);
      });
      publish({ action: "doAdd" }, formDataObj).then(res => {
        if (res.code === "1") {
          this.$message.success("发布成功")
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
    }
  },
  mounted() {
    this.getReceiveUnit();
  },
  computed: {
    getReceiveUnit_params: function () {
      return {
        action: "transferUnitList",
        visible: "1",
      }
    },
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addInspection{
  padding: 10px;
}
</style>