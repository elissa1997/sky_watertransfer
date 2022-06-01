<template>
  <div id="unitAndContacsList">
    <a-tabs default-active-key="1" style="width: 100%;">
      <a-tab-pane key="1" tab="接收单位">
        <div class="treeWarp">
          <a-tree
            v-if="unit.unitTree"
            class="tree"
            checkable
            :checkStrictly="true"
            defaultExpandAll
            :replace-fields="replaceFields"
            :tree-data="unit.unitTree"
            @check="treeCheck"
          >
          </a-tree>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab=" 短信接收人" v-if="unit.sendSMS">
        <div class="treeWarp">
          <a-checkbox-group class="tree" @change="contactsChange" v-model="selected.contactsList">
            <a-checkbox v-for="people in unit.contactsList" :key="people.id" :value="people.tel">{{people.name}}</a-checkbox>
          </a-checkbox-group>
        </div>
      </a-tab-pane>
      <div slot="tabBarExtraContent" style="margin-right: 10px;display: flex;align-items: center;"> 
        短信提醒 &nbsp; <a-switch v-model="unit.sendSMS"/> 
      </div>
    </a-tabs>
  </div>
</template>

<script>
import { Tree, Tabs, Switch, Checkbox } from 'ant-design-vue'
import { receiveUnit, contacts } from "@/network/command/receiveUnit.js";
import { listToTree } from "@/util/listToTree.js";

export default {
  name: "unitAndContacsList",
  props: {},
  components: {
    ATree:Tree,
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    ASwitch:Switch,
    ACheckbox:Checkbox,
    ACheckboxGroup:Checkbox.Group,
  },
  data() {
    return {
      unit: {
        sendSMS: true,
        unitTree: undefined,
        tempList: [],
        contactsList: undefined
      },
      replaceFields: {
        children: 'children',
        title: 'unitname',
        key: 'unitcode'
      },
      selected: {
        unitString: undefined,
        contactsList: undefined
      }
    }
  },
  methods: {
    // 获取接收单位列表
    getReceiveUnit() {         
      receiveUnit(this.getReceiveUnit_params).then(res => {
        if (res.data && res.data.length) {
          this.unit.tempList = res.data;
          this.unit.unitTree = listToTree(res.data, "unitcode", "parent_unitcode", "1001")
        }
      })
    },

    // 树点击
    treeCheck(checkedKeys) {

      let allCheck = checkedKeys.checked;
      this.selected.unitString = [];
      allCheck.forEach(element => {
        if (element != "10011027") {
          this.selected.unitString.push(
            (this.unit.tempList.find(o => o.unitcode === String(element))).unitcode + "," +
            (this.unit.tempList.find(o => o.unitcode === String(element))).unitname + "#"
          )
        }
      });
      // this.$emit('unitChange', temp);
      this.getContacts(allCheck);
    },

    // 获取短信接收人
    getContacts(unitList) {
      let unitCodes = unitList.filter(function(item) {
          return item != "10011027"
      });

      unitCodes = unitCodes.join(",")

      contacts({action: "contactList", unitCodes}).then(res => {
        if (res.code === "1") {
          this.unit.contactsList = [];
          this.unit.contactsList = res.data;
          
          this.selected.contactsList = [];
          this.selected.contactsList = res.data.map(ele => {
            return ele.tel
          });
        }
      })
    },

    // 联系人点击
    contactsChange(val) {
      if (val.length) {
        this.selected.contactsList = val;
      }
      //   this.upload.SMS.list = undefined;
      // }
    },

  },
  mounted() {
    this.getReceiveUnit();
  },
  computed: {
    getReceiveUnit_params: function () {
      return {
        action: "transferUnitList",
        visible: "1",
      }
    },
  },
  watch: {
    'selected.unitString': {
      handler(newVal, oldVal) {
        this.$emit('unitChange', newVal);
      },
      // deep: true
    },
    'selected.contactsList': {
      handler(newVal, oldVal) {
        this.$emit('contactsChange', newVal);
      },
      // deep: true
    },
    'unit.sendSMS': {
      handler(newVal, oldVal){
        if (!newVal) {
          this.selected.contactsList = undefined;
        }
        this.$emit('isSendSMS', newVal);
      }
    }

  }
}
</script>
<style lang="scss" scoped>
#unitAndContacsList{
  border: 1px solid #00000021;
  border-radius: 5px;
  // padding: 10px;
}

::v-deep .ant-checkbox-group {
  display: flex;
  flex-direction: column;
}

::v-deep .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}

.treeWarp {
  height: calc(90vh - 380px);
  overflow-y: auto;
}

.tree {
  padding: 5px;

}
</style>