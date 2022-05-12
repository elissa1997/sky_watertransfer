<template>
  <div id="inspection">
    <div class="operat" v-if="$hasPermission(this.$userInfo.type, 'A')">
      <a-button type="primary" @click="addInspection">添加巡查情况</a-button>
    </div>
    <div class="tableWarp">
      <a-table :columns="inspectionData.colums" :data-source="inspectionData.data" rowKey="id" :pagination="false">
        <a-tag :color="(status === '0')?'orange':'green'" slot="status" slot-scope="status">
          {{(status === "0")?'未回复':'已回复'}}
        </a-tag>
        <template slot="urgeTime" slot-scope="urgeTime">{{$dayjs(urgeTime).format("YYYY-MM-DD HH:mm:ss")}}</template>
        <div slot="action" slot-scope="text, record" class="actionWarp">
          <a class="action" @click="openDetail(record)"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
          <a class="action" @click="replyInspection(record)" v-if="$userInfo.unitCode_ === record.receiveUnitCode && record.status === '0'"><icon-email-push theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>回复</a>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { inspectionList } from "@/network/command/inspection.js";
import { Button, Table, Tag, Divider, } from 'ant-design-vue';

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
    AButton:Button,
    ADivider:Divider,
  },
  data() {
    return {
      inspectionData:{
        colums:[
          { title: '巡查单位', dataIndex: 'urgeUnitName' },
          { title: '巡查内容', dataIndex: 'problem' },
          { title: '被巡查站点', dataIndex: 'receiveUnitName' },
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '巡查发布时间', dataIndex: 'urgeTime', scopedSlots: { customRender: 'urgeTime' } },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data: [],
      }
    }
  },
  methods: {
    openDetail(row) {
      this.$emit('detailInspection', row);
    },

    replyInspection(row) {
      this.$emit('replyInspection', row);
    },

    addInspection() {
      this.$emit('addInspection');
    },

    getInspectionList() {
      inspectionList(this.getInspectionList_params).then(res => {
        if (res.code === "1") {
          this.inspectionData.data = res.data;
        }
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
  // overflow-y: auto;
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
  align-items: center;
  justify-content: flex-start;
  .action {
    display: flex;
    align-items: center;
  }
  .action:not(:first-of-type) {
    margin-left: 5px;
  }
}

</style>