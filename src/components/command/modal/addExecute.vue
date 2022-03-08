<template>
  <div id="addCommand">
    <!-- {{unitList}} -->
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="指令下达单位"><a-tag>{{this.$userInfo.unitName_}}</a-tag></a-form-item>

      <a-form-item label="项目名称">
        <div>表单项</div>
      </a-form-item>
      
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishExecute">下达指令</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>

    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button, Form, Input, Select, Tag, Tree, Tabs, Switch, Upload, Checkbox } from 'ant-design-vue';
import { publish } from "@/network/command/execute.js";


export default {
  name: "addCommand",
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
    ATree:Tree,
    AInput:Input,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    AUploadDragger:Upload.Dragger,
    ASwitch:Switch,
    ACheckbox:Checkbox,
    ACheckboxGroup:Checkbox.Group,
  },
  data() {
    return {

      formData: {
        regCd: this.modalData.reg_cd,
        SMS: {
          isSend: true,
          list: undefined,
          sendUser: this.$userInfo.username_
        }
      }
    }
  },
  methods: {


    publishExecute() {
      // 添加巡查内容成功后 执行关闭窗口示例
      // if (res.code === "1") {
      //   this.$message.success("添加成功")
      //   this.close(true);
      // }else if (res.code === "-1") {
      //   this.$message.warning("添加失败，请重试")
      // }
    },

    close(refresh) {
      this.$emit('close', {refresh, refName: "execute"});
    }
  },
  async mounted() {


  },
  computed: {
    // 组装网络请求的 params、data
    // xxxx_params: function () {
    //   return {
    //     action: "transferUnitList",
    //   }
    // },
    SMSContent: function (params) {
      return `您好,${this.$userInfo.unitName_}${this.$userInfo.realName_}在节水调水平台给你单位下达了调水指令,请及时查收!`
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
#addCommand{
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