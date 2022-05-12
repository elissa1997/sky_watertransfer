<template>
  <div id="addCommand">
    <!-- {{unitList}} -->
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-row >
        <a-col :span="12">
          <a-form-item label="指令编号">
            <a-input v-model="formData.orderNo" placeholder="调度指令编号"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="指令任务">
            <a-input v-model="formData.orderTask" placeholder="指令任务"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="发令单位">
            <a-input v-model="formData.initUnitName" placeholder="发令单位"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="指令类型">
            <a-select v-model="formData.orderType" placeholder="请选择" allowClear>
              <a-select-option value="1">生产操作</a-select-option>
              <a-select-option value="2">维修操作</a-select-option>
              <a-select-option value="3">抢修操作</a-select-option>
              <a-select-option value="4">应急类</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="执行单位">
            <a-select v-if="executeUnitList.length" placeholder="请选择" v-model="formData.executeUnitCode" @change="getCooperationUnitList">
              <a-select-option v-for="item in executeUnitList" :key="item.unitcode" :value="item.unitcode">{{item.unitname}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="协作部门">
            <a-select placeholder="请选择" v-model="formData.cooperationUnitCode" @change="getCooperationUnitName">
              <a-select-option v-for="item in cooperationUnitList" :key="item.unitcode" :value="item.unitcode">{{item.unitname}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="工程名称">
            <a-input v-model="formData.projectName" placeholder="工程名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="执行时间">
            <a-date-picker v-model="formData.executeTime" placeholder="执行时间" show-time format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="指令人">
            <a-input v-model="formData.orderUser" placeholder="指令人"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="签发人">
            <a-input v-model="formData.issueUser" placeholder="签发人"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="日期">
            <a-date-picker v-model="formData.orderDate" placeholder="日期" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="发令时间">
            <a-time-picker v-model="formData.orderTime" placeholder="发令时间" format="HH:mm" valueFormat="HH:mm" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="调度电话">
            <a-input v-model="formData.orderTel" placeholder="调度电话"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="调度传真">
            <a-input v-model="formData.orderFax" placeholder="调度传真"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="24">
          <a-form-item :labelCol="{span:3}" :wrapperCol="{span:19}" label="备注">
            <a-textarea v-model="formData.orderRemark" placeholder="备注" :auto-size="{ minRows: 3, maxRows: 8 }"/>
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
      <a-row v-for="(item,i) in taskList" :key="i">
        <a-col :span="24">
          <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}" :label="'任务内容'+(i+1)">
            <a-row :gutter="16">
              <a-col :span="7"><a-input v-model="item.onOffNum" placeholder="开停机数"/></a-col>
              <a-col :span="7"><a-input v-model="item.flow" placeholder="流量"/></a-col>
              <a-col :span="7"><a-input v-model="item.wv" placeholder="水量"/></a-col>
              <a-col :span="3">
                <a-button type="dashed"
                  :disabled="taskList.length === 1"
                 @click="() => remove(i)"><a-icon type="minus"/></a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item :wrapperCol="{span:20,offset: 3}">
            <a-button type="dashed" @click="addTask"><a-icon type="plus"/>添加任务内容</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary" @click="publishExecute">下达指令</a-button>
        <a-button style="margin-left: 10px" @click="close(false)">取消</a-button>
      </a-form-item>
    </a-form>
    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button,Form,Input,Select,Tree,Upload,Checkbox,Row,Col,Radio,DatePicker,TimePicker,Icon} from 'ant-design-vue';
import { receiveUnit } from "@/network/command/receiveUnit.js";
import { publish } from "@/network/command/execute.js";

export default {
  name: "addExecute",
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
    ATree:Tree,
    AInput:Input,
    AUpload:Upload,
    ACheckbox:Checkbox,
    ACheckboxGroup:Checkbox.Group,
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
        regCd: this.modalData.reg_cd,
        orderNo: '',
        orderTask: '',
        initUnitCode: this.$userInfo.unitCode_,
        initUnitName: this.$userInfo.unitName_,
        orderType: '',
        executeUnitCode: '',
        executeUnitName: '',
        cooperationUnitCode: '',
        cooperationUnitName: '',
        projectName: '',
        executeTime: '',
        orderRemark: '',
        orderUser: this.$userInfo.realName_,
        issueUser: this.$userInfo.realName_,
        orderDate: this.$dayjs().format("YYYY-MM-DD"),
        orderTime: this.$dayjs().format("HH:mm"),
        orderTel: '0552-3918705',
        orderFax: '0552-3918713',
        fileList: [],
      },
      taskList:[],
      executeUnitList:[],
      cooperationUnitList:[],
    }
  },
  methods: {
    // 获取执行单位列表
    async getExecuteUnit() {
      await receiveUnit(this.getExecuteUnit__params).then(res => {
        if (res.data && res.data.length) {
          this.executeUnitList = res.data;
        }   
      })
    },
    getCooperationUnitList(value) {
      this.executeUnitList.forEach(item => {
        if (item.unitcode === value) {
          this.formData.executeUnitName = item.unitname;
        }
      });
      // this.formData.cooperationUnitCode = '';
      // this.formData.cooperationUnitName = '';
      // this.cooperationUnitList = [];
      // receiveUnit({action:"transferUnitList",parent_unitcode:value}).then(res => {
      //   if (res.data && res.data.length) {
      //     this.cooperationUnitList = res.data;
      //   }   
      // })
    },
    // getCooperationUnitName(value) {
    //   this.cooperationUnitList.forEach(item => {
    //     if (item.unitcode === value) {
    //       this.formData.cooperationUnitName = item.unitname;
    //     }
    //   });
    // },
    publishExecute() {
      const formDataObj = new FormData();
      formDataObj.append('regCd', this.formData.regCd);
      formDataObj.append('orderNo', this.formData.orderNo);
      formDataObj.append('orderTask', this.formData.orderTask);
      formDataObj.append('initUnitCode', this.formData.initUnitCode);
      formDataObj.append('initUnitName', this.formData.initUnitName);
      formDataObj.append('orderType', this.formData.orderType);
      formDataObj.append('executeUnitCode', this.formData.executeUnitCode);
      formDataObj.append('executeUnitName', this.formData.executeUnitName);
      formDataObj.append('cooperationUnitCode', this.formData.cooperationUnitCode);
      formDataObj.append('cooperationUnitName', this.formData.cooperationUnitName);
      formDataObj.append('projectName', this.formData.projectName);
      formDataObj.append('executeTime', this.formData.executeTime);
      formDataObj.append('orderRemark', this.formData.orderRemark);
      formDataObj.append('orderUser', this.formData.orderUser);
      formDataObj.append('issueUser', this.formData.issueUser);
      formDataObj.append('orderDate', this.formData.orderDate);
      formDataObj.append('orderTime', this.formData.orderTime);
      formDataObj.append('orderTel', this.formData.orderTel);
      formDataObj.append('orderFax', this.formData.orderFax);
      this.formData.fileList.forEach(file => {
        formDataObj.append('file', file);
      });
      if (this.taskList.length > 0) {
        let strs = '';
        this.taskList.forEach(item => {
          strs+=item.onOffNum+','+item.flow+','+item.wv+'#';
        });
        formDataObj.append('taskstrs', strs);
      }
      publish({ action: "instructionAdd" }, formDataObj).then(res => {
        if (res.code === "1") {
          this.$message.success("发布成功")
          this.close(true);
        }
      })
    },
    remove(num){
      this.taskList.splice(num,1);
    },
    addTask(){
      this.taskList.push({index:this.taskList.length+1,onOffNum: '',flow:'',wv:''});
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
    close(refresh) {
      this.$emit('close', {refresh, refName: "execute"});
    }
  },
  async mounted() {
    await this.getExecuteUnit();
    this.taskList.push({index:1,onOffNum: '',flow:'',wv:''});
  },
  computed: {
    getExecuteUnit__params: function () {
      return {
        action: "transferUnitList",
        parent_unitcode : this.$userInfo.unitCode_,
      }
    },
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addCommand{
  padding: 10px;
  max-height: 700px;
  overflow-y: auto;
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