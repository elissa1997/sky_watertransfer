<template>
  <div id="notice">
    <div class="noticeView">
      <div class="operat">
        <a-button type="primary" @click="addNotice">发布预通知</a-button>
        <a-button>修改通知</a-button>
        <a-button type="primary">确认收到</a-button>
      </div>
      <div class="content" v-if="notice.content">
        <div class="title">关于印发淮水北调工程水量调度方案的通知</div>
        
        <div class="meta">
          <div class="metaItem">
            <icon-calendar theme="outline" size="20" fill="#7a7a7a" :strokeWidth="3"/>
            <span>{{notice.publishTime}}</span>
          </div>

          <div class="metaItem">
            <icon-people theme="outline" size="20" fill="#7a7a7a" :strokeWidth="3"/>
            <span>{{notice.unitName}}</span>
          </div>
        </div>

        <div class="contentText">
          {{notice.content}}
        </div>
      </div>
      <noData v-else/>
    </div>

    <div class="receive">
      <a-table :columns="receiveData.colums" :data-source="receiveData.data" rowKey="id" :pagination="false" >
        <a-tag color="green" slot="status" slot-scope="status">{{status}}</a-tag>
      </a-table>

      {{regData}}
    </div>
  </div>
</template>

<script>
import { noticeContent } from "@/network/command/notice.js";
import { Button, Table, Tag } from 'ant-design-vue';
import noData from "@/components/public/noData.vue";

export default {
  name: "notice",
  props: {
    regData: {
      type: Object,
      default: undefined
    },
  },
  components: {
    AButton:Button,
    ATable:Table,
    ATag:Tag,
    noData
  },
  data() {
    return {
      receiveData:{
        colums:[
          { title: '确认收到单位', dataIndex: 'name' },
          { title: '单位类型', dataIndex: 'type' },
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, },
          { title: '时间', dataIndex: 'time' },
        ],
        data: [
          {id: "1", name: "宿州市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          {id: "2", name: "蚌埠市水利局", type: "市管单位", status: "确认收到", time: "2021-12-17"},
          {id: "3", name: "何巷闸", type: "省管站点", status: "确认收到", time: "2021-12-17"},
          {id: "4", name: "五河站", type: "省管站点", status: "确认收到", time: "2021-12-17"},
          {id: "5", name: "娄宋站", type: "市管站点", status: "确认收到", time: "2021-12-17"},
          {id: "6", name: "贾窝站", type: "市管站点", status: "确认收到", time: "2021-12-17"},

        ]
      },
      notice: {
        title: undefined,
        unitName: undefined,
        publishTime: undefined,
        content: undefined
      }
    }
  },
  methods: {
    addNotice() {
      this.$emit('addNotice');
    },
    getNoticeContent() {
      noticeContent(this.getNoticeContent_params).then(res => {
        if (res.data.length) {
          this.notice.title = res.data[0].noticeName;
          this.notice.unitName = res.data[0].initUnitName;
          this.notice.publishTime = this.$dayjs(res.data[0].createTime).format("YYYY-MM-DD");
          this.notice.content = res.data[0].workContent;
        }
        // console.log(res);
      })
    },

    // 函数名统一refreshByClose，供子弹窗关闭后刷新使用
    refreshByClose(){
      this.getNoticeContent();
    }
  },
  mounted() {
    this.getNoticeContent();
  },
  computed: {
    getNoticeContent_params: function (params) {
      return {
        action: "sendNoticeList",
        initUnitCode: "10011021"
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#notice{
  display: flex;
  justify-content: space-between;
  height: 100%;

}
.noticeView {
  width: 60%;
  height: 100%;
  // padding: 10px;
  border: 1px solid #00000021;
  border-radius: 5px;

  .operat {
    padding: 10px;
    border-bottom: 1px solid #00000021;
    ::v-deep .ant-btn:not(:last-child) {
      margin-right: 20px;
    }
  }

  .content {
    padding: 10px;

    .title {
      text-align: center;
      line-height: 40px;
      font-size: 25px;
      font-weight: 700;
      padding: 10px 0;
    }

    .meta {
      padding: 5px 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .metaItem {
        display: flex;
        align-items: center;
      }
    }

    .contentText {
      height: 500px;
      overflow-y: auto;
    }
    
  }
}

.receive {
  width: calc(40% - 10px);
  height: 100%;
  border: 1px solid #00000021;
  // padding: 2px;
  border-radius: 5px;

}
</style>