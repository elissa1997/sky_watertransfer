<template>
  <div id="replyExecute">
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-row >
        <a-col :span="12">
          <a-form-item label="执行单位">
            <a-input v-model="formData.executeUnitName" placeholder="执行单位"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="负责人">
            <a-input v-model="formData.leader" placeholder="负责人"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="接令人">
            <a-input v-model="formData.connectPeople" placeholder="接令人"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="操作人">
            <a-input v-model="formData.operator" placeholder="负责人"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="监护人">
            <a-input v-model="formData.guarder" placeholder="监护人"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="完成情况">
            <a-select v-model="formData.completion" allowClear>
              <a-select-option value="1">准时完成</a-select-option>
              <a-select-option value="2">延时完成</a-select-option>
              <a-select-option value="3">未完成</a-select-option>
              <a-select-option value="4">其他</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="联系人员">
            <a-input v-model="formData.contacts" placeholder="联系人员"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系电话">
            <a-input v-model="formData.contactTel" placeholder="联系电话"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="接令时间">
            <a-date-picker v-model="formData.receiveDate" placeholder="接令时间" show-time format="YYYY-MM-DD HH:mm" valueFormat="YYYY-MM-DD HH:mm" style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开始时间">
            <a-date-picker v-model="formData.startDate" placeholder="开始时间" show-time format="YYYY-MM-DD HH:mm" valueFormat="YYYY-MM-DD HH:mm" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="完成时间">
            <a-date-picker v-model="formData.completeDate" placeholder="完成时间" show-time format="YYYY-MM-DD HH:mm" valueFormat="YYYY-MM-DD HH:mm" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="24">
          <a-form-item :labelCol="{span:3}" :wrapperCol="{span:19}" label="操作情况">
            <a-textarea v-model="formData.operation" placeholder="操作情况" :auto-size="{ minRows: 3, maxRows: 8 }"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="24">
          <a-form-item :labelCol="{span:3}" :wrapperCol="{span:19}" label="异常情况">
            <a-textarea v-model="formData.abnormal" placeholder="异常情况说明" :auto-size="{ minRows: 3, maxRows: 8 }"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item :labelCol="{span:3}" :wrapperCol="{span:19}" label="附件">
            <a-upload name="file" :multiple="false" :file-list="formData.fileList" :remove="handleRemove" :before-upload="beforeUpload" accept=".pdf,.jpeg,.png">
              <a-button block class="btnInnerCenter"> 
                <icon-upload-one theme="outline" size="16" fill="#9b9b9b" :strokeWidth="3"/>选择文件 
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="replyExecute">保存</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Button,Form,Input,Select,Upload,Row,Col,Radio,DatePicker,TimePicker,Icon} from 'ant-design-vue';
import { publish } from "@/network/command/execute.js";
export default {
  name: "replyExecute",
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
    AInput:Input,
    AUpload:Upload,
    ARow:Row,
    ACol:Col,
    ARadio:Radio,
    ARadioGroup:Radio.Group,
    ARadioButton:Radio.Button,
    ADatePicker:DatePicker,
    ATimePicker:TimePicker,
    AIcon:Icon,
  },
  data() {
    return {
      formData: {
        orderId: this.modalData.id,
        executeUnitCode:this.$store.state.user.info.unitCode_,
        executeUnitName:this.$store.state.user.info.unitName_,
        leader:'',
        connectPeople:'',
        operator:'',
        guarder:'',
        operation:'',
        receiveDate:'',
        startDate:'',
        completeDate:'',
        completion:'',
        abnormal:'',
        contacts:'',
        contactTel:'',
        fileList: [],
      },
    }
  },
  methods: {
    replyExecute(){
      const formDataObj = new FormData();
      formDataObj.append('orderId', this.formData.orderId);
      formDataObj.append('executeUnitCode', this.formData.executeUnitCode);
      formDataObj.append('executeUnitName', this.formData.executeUnitName);
      formDataObj.append('leader', this.formData.leader);
      formDataObj.append('connectPeople', this.formData.connectPeople);
      formDataObj.append('operator', this.formData.operator);
      formDataObj.append('guarder', this.formData.guarder);
      formDataObj.append('operation', this.formData.operation);
      formDataObj.append('receiveDate', this.formData.receiveDate);
      formDataObj.append('startDate', this.formData.startDate);
      formDataObj.append('completeDate', this.formData.completeDate);
      formDataObj.append('completion', this.formData.completion);
      formDataObj.append('abnormal', this.formData.abnormal);
      formDataObj.append('contacts', this.formData.contacts);
      formDataObj.append('contactTel', this.formData.contactTel);
      this.formData.fileList.forEach(file => {
        formDataObj.append('file', file);
      });
      publish({ action: "replyInstruction" }, formDataObj).then(res => {
        if (res.code === "1") {
          this.$message.success("反馈成功")
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
      this.$emit('close', {refresh, refName: "execute"});
    },
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#replyExecute{
  padding: 10px;
  max-height: 700px;
  overflow-y: auto;
}
</style>