<template>
  <div id="addInspection">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="指令下达单位"><a-tag>当前登录用户(上级管理单位)</a-tag></a-form-item>
      <a-form-item label="巡查内容">
        <a-textarea placeholder="巡查内容" :auto-size="{ minRows: 5, maxRows: 15 }"/>
      </a-form-item>
      <a-form-item label="被巡查单位">
        <a-select v-model="unit.typeSelected" placeholder="请选择单位类型" style="width: calc(30% - 5px); margin-right: 10px">
          <a-select-option v-for="typeItem in unit.typeList" :key="typeItem.type">
            {{ typeItem.name }}
          </a-select-option>
        </a-select>

        <a-select v-model="unit.unitSelected" placeholder="请选择被巡查站点" style="width: calc(70% - 5px)">
          <template v-if="unit.typeSelected">
            <a-select-option v-for="unitItem in unit.unitList[unit.typeSelected]" :key="unitItem.unitCode">
              {{ unitItem.name }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 19, offset: 4 }">
        <a-button type="primary">保存</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Button, Form, Input, Select, Tag } from 'ant-design-vue';
import { unitConfig } from "@/config/unitList.js";

export default {
  name: "addInspection",
  props: {},
  components: {
    AButton:Button,
    AForm:Form,
    AFormItem:Form.Item,
    AInput:Input,
    ATextarea:Input.TextArea,
    ASelect:Select,
    ASelectOption:Select.Option,
    ATag:Tag
  },
  data() {
    return {
      unit: {
        typeSelected: undefined,
        unitSelected: undefined,
        typeList: undefined,
        unitList: undefined
      }
    }
  },
  methods: {},
  mounted() {
    this.unit.typeList = unitConfig().typeList;
    this.unit.unitList = unitConfig().unitList;
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#addInspection{
  padding: 10px;
}
</style>