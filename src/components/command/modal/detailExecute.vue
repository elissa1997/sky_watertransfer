<template>
  <div id="detailExecute">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="任务联">
      <div class="detail">
        <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-row>
            <a-col :span="12">
              <a-form-item label="指令编号">
                <span>{{modalData.orderNo}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="指令任务">
                <span>{{modalData.orderTask}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="发令单位">
                <span>{{modalData.initUnitName}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="指令类型">
                <span v-if="modalData.orderType === '1'">生产操作</span>
                <span v-if="modalData.orderType === '2'">维修操作</span>
                <span v-if="modalData.orderType === '3'">抢修操作</span>
                <span v-if="modalData.orderType === '4'">应急类</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="执行单位">
                <span>{{modalData.executeUnitName}}</span>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-item label="协作部门">
                <span>{{modalData.cooperationUnitName}}</span>
              </a-form-item>
            </a-col> -->
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="工程名称">
                <span>{{modalData.projectName}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="执行时间">
                <span>{{$dayjs(modalData.executeTime).format("YYYY-MM-DD HH:mm")}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="指令人">
                <span>{{modalData.orderUser}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="签发人">
                <span>{{modalData.issueUser}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="日期">
                <span>{{$dayjs(modalData.orderDate).format("YYYY-MM-DD")}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发令时间">
                <span>{{modalData.orderTime}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="调度电话">
                <span>{{modalData.orderTel}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="调度传真">
                <span>{{modalData.orderFax}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="任务内容">
                <a-table :columns="columns" :data-source="modalData.taskList" size="small" :pagination="false" :bordered="false"></a-table>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="备注">
                 <span>{{modalData.orderRemark}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="附件">
                <fileList :fileList="modalData.sendFileList"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="反馈联" force-render>
      <div class="detail">
        <noData v-if="modalData.zt === '0'"/>
        <a-form v-if="modalData.reply" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-row>
            <a-col :span="12">
              <a-form-item label="执行单位">
                <span>{{modalData.reply.executeUnitName}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="负责人">
                <span>{{modalData.reply.leader}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="接令人">
                <span>{{modalData.reply.connectPeople}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="操作人">
                <span>{{modalData.reply.operator}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="监护人">
                <span>{{modalData.reply.guarder}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="完成情况">
                <span v-if="modalData.reply.completion === '1'">准时完成</span>
                <span v-if="modalData.reply.completion === '2'">延时完成</span>
                <span v-if="modalData.reply.completion === '3'">未完成</span>
                <span v-if="modalData.reply.completion === '4'">其他</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="联系人员">
                <span>{{modalData.reply.contacts}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话">
                <span>{{modalData.reply.contactTel}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="接令时间">
                <span>{{$dayjs(modalData.reply.receiveDate).format("YYYY-MM-DD HH:mm")}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="开始时间">
                <span>{{$dayjs(modalData.reply.startDate).format("YYYY-MM-DD HH:mm")}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="完成时间">
                <span>{{$dayjs(modalData.reply.completeDate).format("YYYY-MM-DD HH:mm")}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="操作情况">
                 <span>{{modalData.reply.operation}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="异常情况">
                 <span>{{modalData.reply.abnormal}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :labelCol="{span:3}" :wrapperCol="{span:20}"  label="反馈附件">
                <fileList :fileList="modalData.reply.replyFileList"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      </a-tab-pane>
    </a-tabs>
    <!-- {{modalData}} -->
  </div>
</template>

<script>
import { Button, Form, Tag,Row,Col,Tabs,Table } from 'ant-design-vue';
import { filePreview } from "@/network/command/filePreview.js";
import noData from "@/components/public/noData.vue";
import fileList from "@/components/public/fileList.vue";
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
    ATag:Tag,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    ARow:Row,
    ACol:Col,
    ATable:Table,
    noData,
    fileList,
  },
  data() {
    return {
      columns:[
        { title: '开停机数', dataIndex: 'onOffNum'},
        { title: '流量', dataIndex: 'flow'},
        { title: '水量', dataIndex: 'wv'},
      ],
    }
  },
  methods: {
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#detailExecute{
  // padding: 10px;
  max-height: 700px;
  overflow-y: auto;
}

.detail {
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