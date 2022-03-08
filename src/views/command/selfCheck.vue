<template>
  <div id="selfCheck">
    <div class="operat">
      <a-button type="primary" @click="addSelfCheck" v-if="this.$userInfo.type === 'B' || this.$userInfo.type === 'D'">上报自检情况</a-button>
    </div>
    <a-table :columns="selfCheckData.colums" :data-source="selfCheckData.data" rowKey="id" :pagination="false" >
      <a-tag color="green" slot="status" slot-scope="status">{{status}}</a-tag>
      <span slot="action" slot-scope="text, record" @click="openDetail(record)">
        <a class="action"><icon-preview-open theme="outline" size="20" fill="#1890ff" :strokeWidth="3"/>详情</a>
      </span>
    </a-table>
    <!-- {{regData}} -->
  </div>
</template>

<script>
import { selfCheckList } from '@/network/command/selfCheck.js';
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "selfCheck",
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
      selfCheckData:{
        colums:[
          { title: '自检单位', dataIndex: 'feedbackUnitName' },
          // { title: '自检单位类型', dataIndex: 'selfCheckDepartType' },
          { title: '自检内容', dataIndex: 'handleContent' },
          { title: '接收单位', dataIndex: 'receiveUnitName' },
          // { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'feedbackTime' },
          { title: '操作', scopedSlots: { customRender: 'action' } },
        ],
        data: [

        ]
      }
    }
  },
  methods: {
    getSelfCheckList() {
      selfCheckList(this.getSelfCheckList_params).then(res => {
        // console.log(res);
        if (res.data.length) {
          this.selfCheckData.data = res.data;
        }
      })
    },


    openDetail(row) {
      console.log(row);
    },


    addSelfCheck() {
      this.$emit('addSelfCheck');
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getSelfCheckList();
    }
  },
  mounted() {
    this.getSelfCheckList();
  },
  computed: {
    getSelfCheckList_params: function (params) {
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