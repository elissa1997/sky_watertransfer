<template>
  <div id="gateStation">
    <div class="item">
      <div class="lable">采集时间</div>
      <div class="value">{{attributes.tm}}</div>
    </div>
    <div class="item">
      <div class="lable">闸上水位</div>
      <div class="value">{{attributes.z}}</div>
    </div>
    <div class="item">
      <div class="lable">闸下水位</div>
      <div class="value">{{attributes.dwz}}</div>
    </div>
    <!-- <div class="item">
      <div class="lable">流量</div>
      <div class="value compare">
        <div>{{attributes.q}}<a-tag color="cyan">实时</a-tag></div>
        <div>{{attributes.designQ}}<a-tag color="purple">设计</a-tag></div>
      </div>
    </div> -->

    <div class="item">
      <div class="lable">实时流量</div>
      <div class="value">{{attributes.q}}</div>
    </div>
    <div class="item multiLine">
      <div class="lable">引水位</div>
      <div class="value">
        <!-- {{attributes.quote}} -->
        <div class="diversion" v-for="(item,index) in attributes.quote" :key="index">
          <div v-if="item.z">{{item.z}}</div>
          <div v-if="item.q">流量：{{item.q}}</div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="lable">孔数</div>
      <div class="value">{{attributes.number}}</div>
    </div>

    <div class="item" :class="{ multiLine: attributes.gateH && attributes.gateH.split(',').length > 3}">
      <div class="lable">孔门开度</div>
      <div class="value">
        <a-tag v-if="!attributes.gateH">暂无数据</a-tag>
        <div class="tagWarp" v-else>
          <a-tag color="blue" v-for="(item,index) in attributes.gateH.split(',')" :key="index">{{item}}</a-tag>

        </div>
      </div>
    </div>

    <div class="btn">
      <a-button style="width: 60%;" type="primary" @click="openModal">详细信息</a-button>
    </div>

  </div>
</template>

<script>
import { Tag, Button } from 'ant-design-vue';

export default {
  name: "gateStation",
  props: {
    attributes: {
      type: Object,
      default: {}
    },
  },
  components: {
    ATag:Tag,
    AButton:Button
  },
  data() {
    return {}
  },
  methods: {
    openModal() {
      this.$emit('modal');
    }
  },
  mounted() {
    // console.log(this.attributes.quote);
    this.attributes.quote = JSON.parse(this.attributes.quote);
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#gateStation{
  padding: 10px 20px;
}

.item {
  font-size: 15px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lable {
    color: #1890ff;
    width: 100px;
  }

  .lable::after{
    content: ":";
  }

  .value {
    width: calc(100% - 100px);
  }

  .compare {
    display: grid;
    grid-template-columns: 45% 48%;
    justify-content: space-between;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    ::v-deep .ant-tag {
      margin-left: 5px;
    }
  }

  .diversion {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
    font-size: 14px;
  }

  .tagWarp {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    justify-items: center;
    grid-row-gap: 10px;
    padding: 5px 0;
  }
}

.multiLine {
  align-items: flex-start;
}

.btn {
  margin-top: 15px;
  text-align: center;
}
</style>