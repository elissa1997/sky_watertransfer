<template>
  <div id="gis2d">
    <div class="mapView" id="mapView"></div>
    <template v-if="map">
      <baseLayerSwitch :map="map"/>
      <layerTree @checkedChange="checkedChange(arguments)"/>
    </template>
  </div>
</template>

<script>
import baseLayerSwitch from "@/components/mapTool/baseLayerSwitch.vue";
import layerTree from "@/components/mapTool/layerTree.vue";

import {initLayers} from "@/util/baseLayer.js";
import { handlerLayerByTree, loadDefaultLayers } from "@/layers/layerAgent.js"


export default {
  name: "gis2d",
  components: {
    baseLayerSwitch,
    layerTree
  },
  data() {
    return {
      map: null,
      view: null,
    }
  },
  methods: {
    // 控制树点击
    checkedChange(data) {
      console.log("控制树点击");
      handlerLayerByTree(this.map, data[0], data[1]);
    },
    // 初始化创建地图
    createdView() {

      let tileInfo = this.$arcgisModules.TileInfo.create({
        spatialReference: {wkid: 3857},
        numLODs: 20
      });

      this.map = new this.$arcgisModules.Map({
        basemap: new this.$arcgisModules.Basemap({
          baseLayers: initLayers(),
          title: "底图",
          id: "base",
        })
      })

      this.view = new this.$arcgisModules.MapView({
        map: this.map,
        container: "mapView",
        showLabels: true,
        center: [117.408142,33.755000],
        zoom: 9,
        constraints: {
          lods: tileInfo.lods,
          minZoom: 3 ,
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

      // 地图就绪
      this.view.when(() => {
        this.$message.success('地图加载完成');
        // globleMask(this.map);
        // mainLine(this.map);
        loadDefaultLayers(this.map);
      })

      this.view.ui.remove("zoom"); //清除放大缩小按钮
      this.view.ui.remove("attribution"); //清除底部powered by ESRI

    },

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
  }

  .mapView {
    width: 100%;
    height: 100vh;
  }
</style>