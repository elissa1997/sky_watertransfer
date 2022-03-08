<template>
  <div id="inspection">
    <div class="operat">
      <a-button type="primary" @click="addInspection" v-if="this.$userInfo.type === 'A'">添加巡查情况</a-button>
    </div>
    <a-table :columns="inspectionData.colums" :data-source="inspectionData.data" rowKey="id" :pagination="false" >
      <template slot="urgeTime" slot-scope="urgeTime">{{$dayjs(urgeTime).format("YYYY-MM-DD HH:mm:ss")}}</template>
      <span slot="action" slot-scope="text, record" @click="openDetail(record)">
        <a class="action"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { inspectionList } from "@/network/command/inspection.js";
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "inspection",
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
      inspectionData:{
        colums:[
          { title: '巡查单位', dataIndex: 'urgeUnitName' },
          // { title: '巡查单位类型', dataIndex: 'inspectionDepartType' },
          { title: '巡查内容', dataIndex: 'problem' },
          { title: '被巡查站点', dataIndex: 'receiveUnitName' },
          // { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'urgeTime', scopedSlots: { customRender: 'urgeTime' } },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data: [
          // {id: "1", name: "宿州市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          // {id: "2", name: "蚌埠市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          // {id: "1", inspectionDepart: "淮洪新河河道管理局", inspectionDepartType: "省管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "何巷闸", status: "巡查完成", time: "2021-12-17"},
          // {id: "2", inspectionDepart: "淮洪新河河道管理局", inspectionDepartType: "省管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "五河站", status: "巡查完成", time: "2021-12-17"},
          // {id: "3", inspectionDepart: "宿州市水利局", inspectionDepartType: "市管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "娄宋站", status: "巡查完成", time: "2021-12-17"},
          // {id: "4", inspectionDepart: "蚌埠市水利局", inspectionDepartType: "市管中心", inspectionContent: "巡查正常，暂未发现问题", supervisedDepart: "固镇站", status: "巡查完成", time: "2021-12-17"},

        ]
      }
    }
  },
  methods: {
    openDetail(row) {
      console.log(row);
    },

    addInspection() {
      this.$emit('addInspection');
    },

    getInspectionList() {
      inspectionList(this.getInspectionList_params).then(res => {
        if (res.code === "1") {
          this.inspectionData.data = res.data;
        }
        // console.log(res);
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getInspectionList();
    }
  },
  mounted() {
    this.getInspectionList();
  },
  computed: {
    getInspectionList_params: function (params) {
      return {
        action: "list",
        regCd: this.regData.reg_cd
      }
    }
  },
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

}
</style>