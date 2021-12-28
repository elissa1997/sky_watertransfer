<template>
  <div id="execute">
    <div class="operat">
      <a-button type="primary" @click="addCommand">下达指令</a-button>
    </div>
    <a-table :columns="executeData.colums" :data-source="executeData.data" rowKey="id" :pagination="false" >
      <a-tag :color="(status === '确认收到')?'green':'orange'" slot="status" slot-scope="status">{{status}}</a-tag>
      <span slot="action" slot-scope="text, record" @click="openDetail(record)">
        <a class="action"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "execute",
  props: {},
  components: {
      ATable:Table,
      ATag:Tag,
      AButton:Button
  },
  data() {
    return {
      executeData: {
        colums:[
          { title: '指令下达单位', dataIndex: 'commandDepart' },
          { title: '指令内容', dataIndex: 'commandContent' },
          { title: '指令接收单位', dataIndex: 'executeDepart' },
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'time' },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data:[
          {id: "1", commandDepart: "淮洪新河河道管理局", commandContent: "宿州市所属泵站全部开启", executeDepart: "宿州市水利局", supervisedDepart: "何巷闸", status: "确认收到", time: "2021-12-17"},
          {id: "2", commandDepart: "淮洪新河河道管理局", commandContent: "蚌埠市所属泵站全部开启", executeDepart: "蚌埠市水利局", supervisedDepart: "五河站", status: "确认收到", time: "2021-12-17"},
          {id: "3", commandDepart: "宿州市水利局", commandContent: "娄宋泵站开启", executeDepart: "娄宋泵站", status: "等待确认", time: "2021-12-17"},
          {id: "4", commandDepart: "宿州市水利局", commandContent: "带山口泵站开启", executeDepart: "岱山口泵站", status: "确认收到", time: "2021-12-17"},
          {id: "5", commandDepart: "蚌埠市水利局", commandContent: "固镇泵站关闭", executeDepart: "固镇泵站", status: "等待确认", time: "2021-12-17"},
        ]
      }
    }
  },
  methods: {
    addCommand() {
      this.$emit('addCommand');
    }
  },
  mounted() {},
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
.action {
  display: flex;
  align-items: center;

}
</style>