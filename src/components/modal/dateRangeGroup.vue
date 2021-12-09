<template>
  <div id="dateRangeGroup">
    <div class="dateSelect">
      <a-range-picker 
        v-if="mode"
        :mode="[mode,mode]"
        v-model="dateRange"
        :open="open"
        :valueFormat="format"
        :format="format"
        @openChange="openChange"
        @panelChange="panelChange"
      />
      <!-- <a-month-picker v-model="dateRange" valueFormat="YYYY-MM" format="YYYY-MM"/> -->
    </div>

    <a-button-group>
      <a-button :type="(mode === 'date')?'primary':''" @click="modeChange('date')">按日</a-button>
      <a-button :type="(mode === 'month')?'primary':''" @click="modeChange('month')">按月</a-button>
      <a-button :type="(mode === 'year')?'primary':''" @click="modeChange('year')">按年</a-button>
    </a-button-group>

    <a-button type="primary">查询</a-button>
  </div>
</template>

<script>

import { DatePicker, Button } from 'ant-design-vue';

export default {
  name: "dateRangeGroup",
  props: {},
  components: {
    ARangePicker:DatePicker.RangePicker,
    AMonthPicker:DatePicker.MonthPicker,
    AButton:Button,
    AButtonGroup:Button.Group
  },
  data() {
    return {
      mode: undefined,
      open: false,
      format: "YYYY-MM-DD",
      dateRange: []
    }
  },
  methods: {
    openChange(status) {
    if (status) {
        this.open = true;
      } else {
        this.open = false;
      }
    },

    modeChange(mode) {
      this.mode = mode;
      if (mode === "date") { 
        this.format = "YYYY-MM-DD"
        this.dateRange = [];
        this.dateRange.push(this.$dayjs().subtract(7, 'day').format(this.format));
        this.dateRange.push(this.$dayjs().format(this.format));

      };
      if (mode === "month") { 
        this.format = "YYYY-MM"
        this.dateRange = [];
        this.dateRange.push(this.$dayjs().subtract(3, 'month').format(this.format));
        this.dateRange.push(this.$dayjs().format(this.format));

     };
      if (mode === "year") { 
        this.format = "YYYY"; 
        this.dateRange = [];
        this.dateRange.push(this.$dayjs().subtract(2, 'year').format(this.format));
        this.dateRange.push(this.$dayjs().format(this.format));

      };
    },

    panelChange(value) {
      this.dateRange = [];
      this.dateRange.push(this.$dayjs(value[0]).format(this.format));
      this.dateRange.push(this.$dayjs(value[1]).format(this.format));
      this.open = false;

      // console.log(this.$dayjs(value[0]).format(this.format));
    },
  },
  mounted() {
    this.modeChange("date");
  },
  watch: {
    dateRange: {
      handler(newValue, oldValue) {
        this.$emit('change',newValue);
      },
      deep: true,
      immediate: false
    }
  }
}
</script>
<style lang="scss" scoped>
#dateRangeGroup{
  display:  flex;
  justify-content: space-between;
}
</style>