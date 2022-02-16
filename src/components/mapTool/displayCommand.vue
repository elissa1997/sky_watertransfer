<template>
  <div id="displayCommand">
    <div class="lable">调水指令</div>
    <marquee-text :duration="8" :repeat="10" class="scrollText" v-if="!loading">
      <span>&emsp;&emsp;调度指令测试数据&emsp;&emsp;</span>
    </marquee-text>
    <div class="switch" @click="loading = !loading"></div>
  </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import { transferCommand } from "@/network/command/displayCommand.js";
export default {
  name: "displayCommand",
  props: {},
  components: {
    MarqueeText
  },
  data() {
    return {
      loading: false,
      command: undefined
    }
  },
  methods: {
    async getCommand() {
      this.loading = true;
      await transferCommand(this.transferCommandParams).then(res => {
        this.command = res.data[0].inscontent
      })
      this.loading = false;
    }
  },
  mounted() {
    // this.getCommand();
  },
  computed: {
    transferCommandParams: function () {
      return {
        action: "queryList",
        stationcd: "3ded9c032c0145a0ac486e5d0b78fc7b"
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#displayCommand{
  @include grossGlass;
  @include boxShadow;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  left: 320px;
  width: calc(100vw - 300px - 490px - 40px);
  display: flex;
}

.lable {
  text-align: center;
  padding: 10px;
  width: 80px;
  line-height: 24px;
  background-color: #ffffff80;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 4px 0px 5px -4px #0000004a;
}

.scrollText {
  padding: 10px;
  font-size: 16px;
  line-height: 24px;
  color: #ff4d4f;
  font-weight: 700;
  width: calc(100% - 80px);
}

.switch {
  width: 2px;
}
</style>