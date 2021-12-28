<template>
  <div id="selfCheck">
    <div class="operat">
      <a-button type="primary" @click="addSelfCheck">上报自检情况</a-button>
    </div>
    <a-table :columns="selfCheckData.colums" :data-source="selfCheckData.data" rowKey="id" :pagination="false" >
      <a-tag color="green" slot="status" slot-scope="status">{{status}}</a-tag>
      <span slot="action" slot-scope="text, record" @click="openDetail(record)">
        <a class="action"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "selfCheck",
  props: {},
  components: {
    ATable:Table,
    ATag:Tag,
    AButton:Button
  },
  data() {
    return {
      selfCheckData:{
        colums:[
          { title: '自检单位', dataIndex: 'selfCheckDepart' },
          { title: '自检单位类型', dataIndex: 'selfCheckDepartType' },
          { title: '自检内容', dataIndex: 'selfCheckContent' },
          // { title: '管理单位', dataIndex: 'receiveDepart' },
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'time' },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data: [
          // {id: "1", name: "宿州市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          // {id: "2", name: "蚌埠市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          {id: "1", selfCheckDepart: "何巷闸", selfCheckDepartType: "省管站点", selfCheckContent: "自检正常，暂未发现问题", status: "自检完成", time: "2021-12-17"},
          {id: "2", selfCheckDepart: "五河站", selfCheckDepartType: "省管站点", selfCheckContent: "自检正常，暂未发现问题", status: "自检完成", time: "2021-12-17"},
          {id: "3", selfCheckDepart: "娄宋站", selfCheckDepartType: "市管站点", selfCheckContent: "自检正常，暂未发现问题", status: "自检完成", time: "2021-12-17"},
          {id: "4", selfCheckDepart: "固镇站", selfCheckDepartType: "市管站点", selfCheckContent: "自检正常，暂未发现问题", status: "自检完成", time: "2021-12-17"},

        ]
      }
    }
  },
  methods: {
    openDetail(row) {
      console.log(row);
    },
    addSelfCheck() {
      this.$emit('addSelfCheck');
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#selfCheck{
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