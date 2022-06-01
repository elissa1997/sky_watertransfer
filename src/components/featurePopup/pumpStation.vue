<template>
  <div id="pumpStation">
    <div class="item">
      <div class="lable">采集时间</div>
      <div class="value">{{attributes.tm}}</div>
    </div>

    <div class="item">
      <div class="lable">站前水位</div>
      <div class="value compare">
        <div>{{(attributes.z === '-')?'-':attributes.z+'m'}}<a-tag color="cyan">实时</a-tag></div>
        <div>{{attributes.designZ}}m<a-tag color="purple">调水位</a-tag></div>
      </div>
    </div>


    <div class="item">
      <div class="lable">站后水位</div>
      <div class="value compare">
        <div>{{(attributes.dwz === '-')?'-':attributes.dwz+'m'}}<a-tag color="cyan">实时</a-tag></div>
        <div>{{attributes.designCZ}}m<a-tag color="purple">调水位</a-tag></div>
      </div>
    </div>


    <div class="item">
      <div class="lable">流量</div>
      <div class="value compare">
        <div>{{(attributes.mpQi === '-')?'-':attributes.mpQi+'m³/s'}}<a-tag color="cyan">实时</a-tag></div>
        <div>{{attributes.q}}m³/s<a-tag color="purple">设计</a-tag></div>
      </div>
    </div>
    <div class="item">
      <div class="lable">功率</div>
      <div class="value compare">
        <div>{{(attributes.omPwr === '-')?'-':attributes.omPwr+'kW'}}<a-tag color="cyan">开机</a-tag></div>
        <div>{{attributes.installedPower}}kW<a-tag color="purple">装机</a-tag></div>
      </div>
    </div>
    <div class="item">
      <div class="lable">累计水量</div>
      <div class="value">{{(attributes.mpQacc === '-')?'-':(parseFloat(attributes.mpQacc)/10000).toFixed(2)+'万m3'}}</div>
    </div>
    <div class="item">
      <div class="lable">开机台数</div>
      <div class="value">{{attributes.omcn}}</div>
    </div>

    <div class="btn">
      <a-button style="width: 60%;" type="primary" @click="openModal">详细信息</a-button>
    </div>
    
    <!-- {{attributes}} -->
  </div>
</template>

<script>
import { Tag, Button } from 'ant-design-vue';
export default {
  name: "pumpStation",
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
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#pumpStation{
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
    grid-template-columns: 40% 43%;
    justify-content: space-between;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    ::v-deep .ant-tag {
      margin-left: 5px;
    }
  }
}

.btn {
  margin-top: 15px;
  text-align: center;
}

</style>