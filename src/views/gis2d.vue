<template>
  <div id="gis2d">
    <div class="mapView" id="mapView"></div>
    <template v-if="map">
      <!-- <displayCommand/> -->
      <baseLayerSwitch :map="map"/>
      <layerTree @checkedChange="checkedChange(arguments)" @treeClick="treeClick(arguments)"/>
      <!-- <projectPlan @openPlan="openProjectPlan"/>
      <overViewPic/> -->
      <introduce/>
      <infoPanel @waterUserAllTable="openWaterUserAllTable" @openCommand="openCommand" @openWaterUser="openWaterUser"/>
      <test v-if="$env === 'development'"/>
      <!-- <test/> -->

    </template>

    <gisModal :modal="modal"/>

  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
Modal.install(Vue);
import Vue from 'vue'
import displayCommand from "@/components/mapTool/displayCommand.vue";
import baseLayerSwitch from "@/components/mapTool/baseLayerSwitch.vue";
import layerTree from "@/components/mapTool/layerTree.vue";
import introduce from "@/components/mapTool/introduce/tabIndex.vue"
import infoPanel from "@/components/mapTool/infoPanel/tabIndex.vue";
import projectPlan from "@/components/button/projectPlan.vue";
import overViewPic from "@/components/button/overViewPic.vue";

import popupPumpStation from "@/components/featurePopup/pumpStation.vue";
import popupGateStation from "@/components/featurePopup/gateStation.vue";
import gisModal from "@/components/modal/index.vue";

import test from "@/components/userInfo_test.vue";

import {initLayers} from "@/layers/baseLayer.js";
import { handlerLayerByTree, loadDefaultLayers } from "@/layers/layerAgent.js"
import { centerList } from "@/config/area_center.js"

export default {
  name: "gis2d",
  components: {
    AModal:Modal,
    displayCommand,
    baseLayerSwitch,
    layerTree,
    introduce,
    infoPanel,
    projectPlan,
    overViewPic,
    gisModal,
    test
  },
  data() {
    return {
      map: undefined,
      view: undefined,
      modal: {
        visible: false,
        title: undefined,
        data: undefined,
        from: undefined
      }
    }
  },
  methods: {
    // 控制树勾选
    checkedChange(data) {
      console.log("控制树勾选");
      handlerLayerByTree(this.map, this.view, data[0], data[1]);
    },

    // 控制树点击
    treeClick(data) {
      let type = data[0];
      let id = data[1];
      if (type === "featurePoint") {
        let layer = this.map.findLayerById(id.layerId);
        if (layer) {
          let feature = layer.source.items.filter(item=>item.attributes.FID == Number(id.fid))
          this.view.goTo({
            target: feature[0].geometry,
            zoom: 14
          })
        }else{this.$message.warning('此图层还未加载，请先勾选此图层任意项目');}
      }else{
        let geometry = centerList(id);
        this.view.goTo({
          target: geometry,
          zoom: 12
        })
      }
    },


    // 初始化创建地图
    async createdView() {

      let tileInfo = this.$arcgisModules.TileInfo.create({
        spatialReference: {wkid: 4326},
        numLODs: 20
      });

      this.map = new this.$arcgisModules.Map({
        basemap: new this.$arcgisModules.Basemap({
          baseLayers: initLayers(),
          title: "底图",
          id: "base",
        })
      })

      // let anHuiExtents = new this.$arcgisModules.Extent({
      //   xmin: 12780501.0538,
      //   ymin: 3426136.3483,
      //   xmax: 13324502.7707,
      //   ymax: 4114204.0916,
      //   spatialReference: { wkid: 102100 }
      // });

      this.view = new this.$arcgisModules.MapView({
        map: this.map,
        container: "mapView",
        showLabels: true,
        center: [117.408142,33.755000],
        // extent: anHuiExtents,
        // spatialReference: {
        //   wkid: 102100
        // },
        zoom: 10,
        constraints: {
          lods: tileInfo.lods,
          minZoom: 10,
          maxZoom: 18,
          rotationEnabled: false
        },
        popup: {
          collapseEnabled : false, // 移除title点击折叠功能
          dockOptions: {
              buttonEnabled: false // 隐藏固定标签页
          },
          actions: [] // 清空事件按钮 （缩放至、...）
        }
      });
      // this.popup = this.view.popup;
      // 地图就绪
  
      await this.view.when(async () => {
        this.$message.success('地图加载完成');
        loadDefaultLayers(this.map, this.view);
        this.featureClick();
        // this.test();
      })

      this.view.ui.remove("zoom"); //清除放大缩小按钮
      this.view.ui.remove("attribution"); //清除底部powered by ESRI

      this.view.on("pointer-down", () => {
        // let extent = this.view.extent;
        // console.log("ymax:"+extent.ymax);
        // console.log("xmax:"+extent.xmax);
        // console.log("ymin:"+extent.ymin);
        // console.log("xmin:"+extent.xmin);
        
      });
    },


    //要素点击
    featureClick() {
      this.view.popup.autoOpenEnabled = false;
      
      this.view.on('click', event => {
        this.view.hitTest(event).then( response => {
          if (response.results.length > 0) {
            let feature = response.results[0];
            if ( feature.graphic.layer.id === "businessLayer_01" ) {

            }else if( feature.graphic.layer.id === "businessLayer_02" ){
              // 泵站弹窗
              this.view.popup.open({
                title: feature.graphic.attributes.name,
                location: feature.mapPoint,
                content: "加载中",
              })
              const p = Vue.extend(popupPumpStation);
              let vm = new p({
                propsData: {
                  attributes: feature.graphic.attributes,
                }
              })
              vm.$mount();
              vm.$nextTick(()=>{ this.view.popup.content = vm.$el });
              vm.$on('modal',  () => { this.openModal(feature.graphic.attributes.name, feature.graphic.attributes, feature.graphic.layer.id) })
            }else if( feature.graphic.layer.id === "businessLayer_03" ){
              // 闸站弹窗
              this.view.popup.open({
                title: feature.graphic.attributes.name,
                location: feature.mapPoint,
                content: "加载中",
              })
              const p = Vue.extend(popupGateStation);
              let vm = new p({
                propsData: {
                  attributes: feature.graphic.attributes,
                }
              })
              vm.$mount();
              vm.$nextTick(()=>{ this.view.popup.content = vm.$el });
              vm.$on('modal',  () => { this.openModal(feature.graphic.attributes.name, feature.graphic.attributes, feature.graphic.layer.id) })
            }else if ( feature.graphic.layer.id === "businessLayer_08" ) {
              this.openModal(feature.graphic.attributes.name, feature.graphic.attributes, "businessLayer_08")
            }else if ( feature.graphic.layer.id === "businessLayer_30" || feature.graphic.layer.id === "businessLayer_33" || feature.graphic.layer.id === "businessLayer_36") {
              this.openModal(feature.graphic.attributes.name, feature.graphic.attributes, "waterUser")
            }
          }
        })
      })
    },

    // 打开弹窗
    openModal(title, data, from) {
      this.modal.visible = true;
      this.modal.title = title;
      this.modal.data = data;
      this.modal.from = from
    },

    openProjectPlan(data) {
      this.openModal("工程概况", data, "projectPlan");
    },

    openWaterUserAllTable(data) {
      this.openModal("全部取水户列表", data, "waterUserAllTable");
    },

    openCommand(data) {
      this.openModal("调水指令-(用户："+this.$userInfo.unitName_+")", data, "transferCommand");
    },

    openWaterUser(data) {
      let props = {
        addvcd:" ",
        cert_num_mp_cds: (data.cert_num_codes.indexOf(",") > -1) ? null : data.cert_num_codes,
        cods: data.owner_code,
        ennmcd: " ",
        name: data.wat_rig_owner,
      }
      // console.log(props);
      this.openModal(data.wat_rig_owner, props, "waterUser");
    }

  },

  created() {

  },

  mounted() {
    this.createdView();
    // getMapObject(this.map);
  }

}
</script>

<style lang="scss" scoped>
  #gis2d {
    position: relative;
    overflow-x: hidden;
  }

  .mapView {
    width: 100%;
    height: calc(100vh - 70px);
  }
</style>