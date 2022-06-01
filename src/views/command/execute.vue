<template>
  <div id="execute">
    <div class="operat" v-if="$hasPermission(this.$userInfo.type, 'A')">
      <a-button type="primary" @click="addExecute">下达指令</a-button>
    </div>
    <div class="tableWarp">
      <a-table class="table" :columns="executeData.colums" :data-source="executeData.data" rowKey="id" :pagination="false" >
        <span slot="executeTime" slot-scope="text, record">{{$dayjs(record.executeTime).format("YYYY-MM-DD HH:mm")}}</span>
        <a-tag :color="(zt === '0')?'orange':'green'" slot="zt" slot-scope="zt">
          {{(zt === "0")?'未反馈':'已反馈'}}
        </a-tag>
        <span class="actionWarp" slot="action" slot-scope="text, record">
          <a class="action"  @click="openDetail(record)"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
          <a class="action" @click="replyExecute(record)" v-if="$userInfo.unitCode_ === record.executeUnitCode && record.zt === '0'"><icon-email-push theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>反馈</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { executeList, receiveExecute } from "@/network/command/execute.js"
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "execute",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {
      ATable:Table,
      ATag:Tag,
      AButton:Button
  },
  data() {
    return {
      executeData: {
        colums:[
          { title: '指令编号', dataIndex: 'orderNo' },
          { title: '指令任务', dataIndex: 'orderTask' },
          { title: '发令单位', dataIndex: 'initUnitName' },
          { title: '执行单位', dataIndex: 'executeUnitName'},
          { title: '调度电话', dataIndex: 'orderTel'},
          { title: '状态', dataIndex: 'zt', scopedSlots: { customRender: 'zt' }, },
          { title: '执行时间', dataIndex: 'executeTime', scopedSlots: { customRender: 'executeTime' } },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data:[]
      }
    }
  },
  methods: {
    addExecute() {
      this.$emit('addExecute');
    },
    replyExecute(row) {
      this.$emit('replyExecute', row);
    },

    openDetail(record) {
      this.$emit('executeDetail', record);
    },

    getExecuteList() {
      executeList(this.getExecuteList_params).then(res => {
        if (res.code === "1") {
          this.executeData.data = res.data;
        }
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getExecuteList()
      // console.log("刷新操作");
    },

    receive(record) {
      receiveExecute({action: "confirmInstruction", id: record.instructionRef.id}).then(res => {
        // console.log(res);
        if (res.code === "1") {
          this.getExecuteList()
        }
      })
      // console.log(record)
    }
  },
  mounted() {
    this.getExecuteList();
  },
  computed: {
    getExecuteList_params: function (params) {
      if (this.$userInfo.type === "A") {
        return {
          "action": "instructionList",
          "regCd": this.regData.reg_cd,
        // "instructionRef.unitCode": this.$userInfo.unitCode_
        }
      }else {
        return {
          "action": "instructionList",
          "regCd": this.regData.reg_cd,
          "instructionRef.unitCode": this.$userInfo.unitCode_
        }
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#execute{
  height: 100%;
  border: 1px solid #00000021;
  border-radius: 5px;
}
.operat {
  padding: 10px;
  border-bottom: 1px solid #00000021;
}
.tableWarp {
  overflow-y: scroll;
  height: calc(100% - 60px);
}
.actionWarp {
  display: flex;
}

.action {
  display: flex;
  align-items: center;
}

.action:not(:first-of-type) {
  margin-left: 10px;
}

.table {
  height: calc(100% - 60px);
  overflow-y: auto;
}
</style>