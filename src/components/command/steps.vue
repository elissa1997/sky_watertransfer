<template>
  <div id="steps">
    <div class="stepItem" v-for="(item,index) in steps" :key="index" :class="{active: index+1 == current, display: index+1 == displayNum}" @click="changeDisplay(index)">
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
      default: () => ["调水方案", "调水预通知", "调水巡查" ,"工作会议", "实施调水", " "]
    },
    current: {
      type: Number,
      default: 0
    },
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
      if (num < this.current) {
        this.displayNum = num+1;
        this.$emit('changeDisplay', num+1);
      }else {
        this.$message.warning(this.steps[num]+"还未开始");
      }
    }
  },
  mounted() {
    if (this.$userInfo.type === "E" || this.$userInfo.type === "A") {
      this.steps[5] = "水量信息";
    }else{
      this.steps[5] = "信息上报";
    }
  },
  watch: {
    current: {
      handler (newValue, oldValue) {
        // console.log(newValue)
        if (newValue === 7) {
          this.displayNum = 6
        }else{
          this.displayNum = newValue
        }
      },
      deep: false,
      immediate: true
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