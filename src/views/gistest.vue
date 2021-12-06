<template>
  <div id="gis2d">
    <div class="mapView" id="mapView"></div>
    <template v-if="map">
      <baseLayerSwitch :map="map"/>
      <!-- <layerTree @checkedChange="checkedChange(arguments)"/> -->
    </template>
  </div>
</template>

<script>

import baseLayerSwitch from "@/components/mapTool/baseLayerSwitch.vue";

import {initLayers} from "@/util/baseLayer.js";
import { loadDefaultLayers } from "@/layers/layerAgent.js"


export default {
  name: "gis2d",
  components: {

    baseLayerSwitch,

  },
  data() {
    return {
      map: null,
      view: null,
    }
  },
  methods: {
    
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

      let anHuiExtents = new this.$arcgisModules.Extent({
        xmin: 12780501.0538,
        ymin: 3426136.3483,
        xmax: 13324502.7707,
        ymax: 4114204.0916,
        spatialReference: { wkid: 102100 }
      });

      this.view = new this.$arcgisModules.MapView({
        map: this.map,
        container: "mapView",
        showLabels: true,
        // center: [117.408142,33.755000],
        extent: anHuiExtents,
        spatialReference: {
          wkid: 102100
        },
        zoom: 9,
        // constraints: {
        //   lods: tileInfo.lods,
        //   minZoom: 3 ,
        //   maxZoom: 18,
        //   rotationEnabled: false
        // },
        // popup: {
        //   collapseEnabled : false, // 移除title点击折叠功能
        //   dockOptions: {
        //       buttonEnabled: false // 隐藏固定标签页
        //   },
        //   actions: [] // 清空事件按钮 （缩放至、...）
        // }
      });

      // 地图就绪
      // this.featureClick();
  
      this.view.when(() => {

        this.$message.success('地图加载完成');
        const centerPoint = this.view.center.clone();
        console.log(centerPoint);

        this.view.popup.open({
          title: "Popup dock positions",
          location: centerPoint,
          content:
            "Use the control in the center of the map to change the location where the popup will dock."
        });
        loadDefaultLayers(this.map);
      })

      this.view.ui.remove("zoom"); //清除放大缩小按钮
      this.view.ui.remove("attribution"); //清除底部powered by ESRI


    },


    //要素点击
    featureClick() {
      this.view.autoOpenEnabled = false;
      this.view.on('click', (event) => {
        this.view.hitTest(event).then( (response) => {
          if (response.results.length > 0) {
            let feature = response.results[0];
            // console.log(feature);
            if (  feature.graphic.layer.id === "businessLayer_01" || feature.graphic.layer.id === "businessLayer_02" ||
                  feature.graphic.layer.id === "businessLayer_03" || feature.graphic.layer.id === "businessLayer_04"
            ) {
              console.log(feature)
              // esri弹窗
              // this.view.popup.visible = true;
              // this.view.popup.location = feature.mapPoint;
              // this.view.popup.title = feature.graphic.attributes.name
              this.view.popup.open({
                title: feature.graphic.attributes.name,
                location: feature.graphic.geometry,
                content: "加载中",
                features: [feature]
              })

            }
          }
        })
      })
    },

    test() {
      let that = this;
      this.view.on("click", function(event){
        console.log(event);
        that.view.popup.open({
        location: event.mapPoint,  // location of the click on the view
        title: "You clicked here",  // title displayed in the popup
        content: "This is a point of interest"  // content displayed in the popup
        });
      });
    }

  },

  created() {

  },

  mounted() {
    // this.createdView();
    // getMapObject(this.map);

        // const webmap = new this.$arcgisModules.WebMap({
        //   portalItem: {
        //     // autocasts as new PortalItem()
        //     id: "ea59225e90e34924a4e593269de347af"
        //   }
        // });

        const map = new this.$arcgisModules.Map({
          basemap: new this.$arcgisModules.Basemap({
            baseLayers: initLayers(),
            title: "底图",
            id: "base",
          })
        })


        const view = new this.$arcgisModules.MapView({
          map: map,
         
          container: "mapView"
        });

        const popup = view.popup;
        popup.visibleElements = {
          closeButton: false
        };

        view.when(() => {
          const centerPoint = view.center.clone();
          popup.autoOpenEnabled = false;
          view.on('click', event => {
            console.log(event);
            popup.open({
              title: "Popup dock positions",
              location: event.mapPoint,
              content:
                "Use the control in the center of the map to change the location where the popup will dock."
            });

          })

        });
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