<template>
  <div id="layerTree" >
    <div class="head">
      <span class="title">图层控制</span>
      <component :is="(collapse)?'icon-menu-unfold-one':'icon-menu-fold-one'" theme="outline" size="24" fill="#099e07" :strokeWidth="3"/>
    </div>

    <div class="tree" v-if="treeData">
      <a-tree
        show-icon
        checkable
        :tree-data="treeData"
        :defaultCheckedKeys="defaultKeys"
        @check="treeCheck"
        @select="treeClick"
      >
        <img slot="businessLayer_01"  src="/dist/icon/riverPath_blue_128.svg">
        <img slot="businessLayer_02"  src="/dist/icon/pumpStation_red_128.svg">
        <img slot="businessLayer_03"  src="/dist/icon/waterGate_red_128.svg">
        <img slot="businessLayer_04"  src="/dist/icon/waterGate_purple_110.svg">
        <img slot="businessLayer_05"  src="/dist/icon/waterGate_gray_100.svg">
        <img slot="businessLayer_06"  src="/dist/icon/culvert_yellow_100.svg">
        <img slot="businessLayer_07"  src="/dist/icon/lake_blue_128.svg">
        <img slot="businessLayer_08"  src="/dist/icon/videoStation_128.svg">
        <img slot="waterDistribution"  src="/dist/icon/hydraulic_facility_128.svg">
      </a-tree>
    </div>
  </div>
</template>

<script>

import { Button, Tree } from 'ant-design-vue';
import { baseJson } from "@/network/staticData.js";


export default {
  name: "layerTree",
  components:{ AButton:Button, ATree:Tree },
  data() {
    return {
      collapse: true,
      treeData: undefined,
      defaultKeys: undefined,

      regex: {
        layer: /businessLayer_\d+/,
        layerAndfid: /businessLayer_\d+-FID\d+/
      }
    }
  },

  methods: {
    async getTreeData() {
        await baseJson("Huai_NorthTransfer_tree.json").then(res => {
        this.treeData = res.treeData;
        this.defaultKeys = res.defaultCheck;
      })
    },

    // 勾选操作
    treeCheck(checkedKeys, e) {
      let checkedTree = []
      let allCheck = [...checkedKeys,...e.halfCheckedKeys];
      // console.log(allCheck);
      // 先筛选图层选项
      allCheck.map(elem =>{
        if (!this.regex.layerAndfid.exec(elem) && this.regex.layer.exec(elem)) {
          checkedTree.push({layerId: elem, fid:[]});
        }
      })

      // 再将要素选项放入图层fid
      allCheck.map(elem =>{
        if (this.regex.layerAndfid.exec(elem)) {
          checkedTree.map(layer => {
            if (layer.layerId == elem.replace(/-FID\d+/s,``)) {
              layer.fid.push(Number(elem.replace(/businessLayer_\d+-FID/s,``)));
            }
          })
        }
      })

      this.$emit('checkedChange',checkedTree, this.getAllLayerId());

    },

    // 默认勾选
    defaultCheck() {
      let checkedTree = [];
      this.defaultKeys.forEach(key => {
        let checkFid = [];
        this.treeData.map(layer => {
          if (layer.key == key) {
            checkFid = layer.children.map(feature => { 
              return Number(feature.key.replace(/businessLayer_\d+-FID/s,``)) 
            });
          }
        })
        // console.log(checkFid);
        checkedTree.push({layerId: key, fid:checkFid})
      });

      this.$emit('checkedChange',checkedTree, this.getAllLayerId());
    },

    // 获取树中所有图层id
    getAllLayerId() {
      let regex = /businessLayer_\d+$/m;
      let allLayerId = [];

      // 递归搜索图层id
      let parseTreeJson = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;
        for (let i = 0, len = treeNodes.length; i < len; i++) {
            let childs = treeNodes[i].children;

            if(regex.exec(treeNodes[i].key)){
              allLayerId.push(treeNodes[i].key);
            };
            if (childs && childs.length > 0) {
                parseTreeJson(childs);
            }
        }
      };

      parseTreeJson(this.treeData);
      return allLayerId.sort();
    },

    // 树点击
    treeClick(selectedKeys,e) {
      let select = selectedKeys[0];
      let regex = /(businessLayer_\d+-FID)|(sz)|(hb)|(bb)/m;
      if(regex.exec(select)){
        let featurePointRegex = /businessLayer_\d+-FID\d+/m;
        if (featurePointRegex.exec(select)) {
          // 要素点点击
          let layerId = select.replace(/-FID\d+/s,``);
          let fid = select.replace(/businessLayer_\d+-FID/s,``);
          this.$emit('treeClick', 'featurePoint', {layerId,fid});
        }else{
          // 地区点击
          this.$emit('treeClick', 'area', select);
        }
      }
    }
  },


  created() {

  },
  async mounted() {
    await this.getTreeData();
    this.defaultCheck();
  },
}
</script>

<style lang="scss" scoped>
 #layerTree {
    @include grossGlass;
    @include boxShadow;
    @include animation_cubic-bezier;

    // padding: 10px 0px;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    min-width: 300px;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-bottom:0.5px solid #00000017;
    
    .title {
      @include title_text;
    }

    .i-icon {
      height: 24px;
    }
  }

  .tree {
    padding: 5px 10px;
    max-height: 80vh;
    overflow-y: auto;

    img {
      height: 17px;
      margin-right: 5px;
    }
  }
</style>