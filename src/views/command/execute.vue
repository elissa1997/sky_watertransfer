<template>
  <div id="execute">
    <div class="operat">
      <a-button type="primary" @click="addExecute" v-if="$userInfo.type === 'A'">下达指令</a-button>
    </div>
    <a-table class="table" :columns="executeData.colums" :data-source="executeData.data" rowKey="instructionRef.id" :pagination="false" >
      <span slot="ts" slot-scope="ts">{{$dayjs(ts).format("YYYY-MM-DD HH:mm")}}</span>
      <a-tag :color="(status === '0')?'orange':'green'" slot="status" slot-scope="status">{{(status === '0')?'暂未确认':'确认收到'}}</a-tag>
      <span class="actionWarp" slot="action" slot-scope="text, record">
        <a class="action"  @click="openDetail(record)"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
        <a class="action" v-if="$userInfo.type != 'A'" @click="receive(record)" :disabled="record.instructionRef.zt === '1'">
          <icon-check-correct theme="outline" size="20" :fill="(record.instructionRef.zt === '1')?'#bfbfbf':'#1890ff'" :strokeWidth="3"/>收到指令
        </a>
      </span>
    </a-table>
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
          { title: '指令下达单位', dataIndex: 'createUnitName' },
          { title: '指令内容', dataIndex: 'content' },
          { title: '指令接收单位', dataIndex: 'instructionRef.unitName' },
          { title: '状态', dataIndex: 'instructionRef.zt', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'ts', scopedSlots: { customRender: 'ts' } },
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