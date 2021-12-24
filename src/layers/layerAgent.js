import Vue from 'vue';

const arcgisModules = Vue.prototype.$arcgisModules;


import globleMask from "@/layers/globleMask.js";

import * as businessLayer_01 from "@/layers/business_layer/mainLine.js";
import * as businessLayer_02 from "@/layers/business_layer/pumpStation_L8.js";
import * as businessLayer_03 from "@/layers/business_layer/gateStation_large.js";
import * as businessLayer_04 from "@/layers/business_layer/gateStation_medium.js";
import * as businessLayer_05 from "@/layers/business_layer/gateStation_small.js";
import * as businessLayer_06 from "@/layers/business_layer/culvert.js";
import * as businessLayer_07 from "@/layers/business_layer/lake.js";
import * as businessLayer_08 from "@/layers/business_layer/video.js";
import * as businessLayer_09 from "@/layers/business_layer/administrative_division.js";

import * as businessLayer_30 from "@/layers/business_layer/HB_user.js";
import * as businessLayer_31 from "@/layers/business_layer/HB_storage.js";
import * as businessLayer_32 from "@/layers/business_layer/HB_line.js";
import * as businessLayer_33 from "@/layers/business_layer/SZ_user.js";
import * as businessLayer_34 from "@/layers/business_layer/SZ_storage.js";
import * as businessLayer_35 from "@/layers/business_layer/SZ_line.js";
import * as businessLayer_36 from "@/layers/business_layer/BB_user.js";

const layerObj = {
  businessLayer_01: {layer: businessLayer_01, index: 1},
  businessLayer_02: {layer: businessLayer_02, index: 8},
  businessLayer_03: {layer: businessLayer_03, index: 7},
  businessLayer_04: {layer: businessLayer_04, index: 6},
  businessLayer_05: {layer: businessLayer_05, index: 5},
  businessLayer_06: {layer: businessLayer_06, index: 4},
  businessLayer_07: {layer: businessLayer_07, index: 3},
  businessLayer_08: {layer: businessLayer_08, index: 2},
  businessLayer_09: {layer: businessLayer_09, index: 0},

  businessLayer_30: {layer: businessLayer_30, index: 14},
  businessLayer_31: {layer: businessLayer_31, index: 12},
  businessLayer_32: {layer: businessLayer_32, index: 10},
  businessLayer_33: {layer: businessLayer_33, index: 13},
  businessLayer_34: {layer: businessLayer_34, index: 11},
  businessLayer_35: {layer: businessLayer_35, index: 9},
  businessLayer_36: {layer: businessLayer_36, index: 15},
};

// 默认加载图层
export function loadDefaultLayers(map) {
  globleMask(map);
}

// 控制树控制
export async function handlerLayerByTree(map, view, checkKeys, allLayerId) {

  for (let index = 0; index < allLayerId.length; index++) {
    const id = allLayerId[index];
    let isChecKeys = checkKeys.find(layer => layer.layerId == id)
    let isLoadOnMap = map.findLayerById(id);
    // console.log(view)
    // console.log(id, isChecKeys, isLoadOnMap);
    if (isChecKeys) {
      // 已勾选
      if (!isLoadOnMap) {
        // 地图未加载该图层，先加载图层 
        
        // console.log(id);
        let layer = new arcgisModules.FeatureLayer(await layerObj[id].layer.featureLayer());
        let index = layerObj[id].index;
        // layer.visible = true;
        map.add(layer, index);
        
      }else{
        // 地图已加载该图层，visible设为true
        isLoadOnMap.visible = true;
      }

      isLoadOnMap = map.findLayerById(id);
      view.whenLayerView(isLoadOnMap).then(function (layerView) {
        layerView.filter = {
          objectIds: isChecKeys.fid
        }
      });
      
  
      // 根据fid更新要素

    }else{
      // 未勾选
      if (isLoadOnMap) {
        // 地图已加载该图层，visible设为false
        isLoadOnMap.visible = false;
  
      }else{
        // 地图未加载该图层，不操作
      }
    }
    
  }
  // console.log("默认图层加载完成");
}

export async function layerTest(map) {
  let layer = new arcgisModules.FeatureLayer(await bussiness_01.featureLayer());
  map.add(layer);
}