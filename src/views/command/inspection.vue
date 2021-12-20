<template>
  <div id="inspection">
    <div class="operat">
      <a-button type="primary">添加巡查情况</a-button>
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
  name: "inspection",
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
          { title: '巡查单位', dataIndex: 'inspectionDepart' },
          { title: '巡查单位类型', dataIndex: 'inspectionDepartType' },
          { title: '巡查内容', dataIndex: 'inspectionContent' },
          { title: '被巡查站点', dataIndex: 'supervisedDepart' },
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'time' },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data: [
          // {id: "1", name: "宿州市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          // {id: "2", name: "蚌埠市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          {id: "1", inspectionDepart: "淮洪新河河道管理局", inspectionDepartType: "省管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "何巷闸", status: "巡查完成", time: "2021-12-17"},
          {id: "2", inspectionDepart: "淮洪新河河道管理局", inspectionDepartType: "省管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "五河站", status: "巡查完成", time: "2021-12-17"},
          {id: "3", inspectionDepart: "宿州市水利局", inspectionDepartType: "市管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "娄宋站", status: "巡查完成", time: "2021-12-17"},
          {id: "4", inspectionDepart: "蚌埠市水利局", inspectionDepartType: "市管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "固镇站", status: "巡查完成", time: "2021-12-17"},

        ]
      }
    }
  },
  methods: {
    openDetail(row) {
      console.log(row);
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#inspection{
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

  ::v-deep  .i-icon {
    height: 20px;
  }
}
</style>