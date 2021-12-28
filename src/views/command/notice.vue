<template>
  <div id="notice">
    <div class="noticeView">
      <div class="operat">
        <a-button type="primary" @click="addNotice">发布预通知</a-button>
        <a-button>修改通知</a-button>
        <a-button type="primary">确认收到</a-button>
      </div>
      <div class="content">
        <div class="title">关于印发淮水北调工程水量调度方案的通知</div>
        
        <div class="meta">
          <div class="metaItem">
            <icon-calendar theme="outline" size="20" fill="#7a7a7a" :strokeWidth="3"/>
            <span>{{$dayjs().format('YYYY-MM-DD')}}</span>
          </div>

          <div class="metaItem">
            <icon-people theme="outline" size="20" fill="#7a7a7a" :strokeWidth="3"/>
            <span>淮洪新河河道管理局</span>
          </div>
        </div>

        <div class="contentText">
          1.4水量调度原则<br />
          水量调度遵循节水为先、总量控制、定额管理、统筹兼顾的原则。并服从防洪排涝调度，保证防洪安全。优先使用当地地表水，合理利用香涧湖及淮河水。调水期香涧湖及淮河水源区水质达到地表水III类标准。<br />
          <br />
          1.5供水范围<br />
          淮北市(含濉溪县城)、宿州市(含符离集镇)两市工业用水，一般年份考虑蚌埠市香涧湖周边农业灌溉和输水沿线蚌埠市固镇县城、宿州市灵璧县城以及宿州市北部萧县县城的工业发展用水，特别干旱年份以保障重要工业用水为主。<br />
          <br />
          1.6供水目标<br />
          以淮北、宿州两市工业用水为主，兼顾输水沿线城镇补水、农业灌溉和生态用水。
        </div>
      </div>
    </div>

    <div class="receive">
      <a-table :columns="receiveData.colums" :data-source="receiveData.data" rowKey="id" :pagination="false" >
        <a-tag color="green" slot="status" slot-scope="status">{{status}}</a-tag>
      </a-table>
    </div>
  </div>
</template>

<script>
import { Button, Table, Tag } from 'ant-design-vue';

export default {
  name: "notice",
  props: {},
  components: {
    AButton:Button,
    ATable:Table,
    ATag:Tag
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
      }
    }
  },
  methods: {
    addNotice() {
      this.$emit('addNotice');
    }
  },
  mounted() {},
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