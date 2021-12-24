<template>
  <div id="steps">
    <div class="stepItem" v-for="(item,index) in steps" :key="index" :class="{active: index == current, display: index == displayNum}" @click="changeDisplay(index)">
      <div class="number">{{index+1}}</div>
      <div class="text">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "steps",
  props: {
    steps: {
      type: Array,
      default: () => ["调水方案", "调水预通知", "自检上报", "调水巡查", "工作会议", "实时调水"]
    },
    current: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {
      displayNum: 0
    }
  },
  methods: {
    changeDisplay(num) {
      // console.log(num);
      if (num <= this.current) {
        this.displayNum = num;
        this.$emit('changeDisplay', num);
      }else {
        this.$message.warning(this.steps[num]+"还未开始");
      }
    }
  },
  mounted() {
    
  },
  watch: {
    current: {
      handler (newValue, oldValue) {
        this.displayNum = newValue
      },
      deep: false,

    }
  }
}
</script>
<style lang="scss" scoped>
#steps{
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 6px -6px #0000007a;
}

.stepItem {
  // margin-left: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  .number {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    line-height: 27px;
    font-size: 17px;
    text-align: center;
    border: 1px solid #00000021;
    border-radius: 50%;
  }

  .text {
    font-size: 17px;
  }
}

.active {
  color: #1890ff;

  .number {
    color: #fff;
    background-color: #1890ff;
    border: 1px solid #1890ff;
  }
}

.display {
  border-bottom: 2px solid #1890ff;
}

</style>