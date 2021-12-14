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

import * as businessLayer_10 from "@/layers/business_layer/HB_user.js";
import * as businessLayer_11 from "@/layers/business_layer/HB_storage.js";
import * as businessLayer_12 from "@/layers/business_layer/HB_line.js";
import * as businessLayer_13 from "@/layers/business_layer/SZ_user.js";
import * as businessLayer_14 from "@/layers/business_layer/SZ_storage.js";
import * as businessLayer_15 from "@/layers/business_layer/SZ_line.js";
import * as businessLayer_16 from "@/layers/business_layer/BB_user.js";

const layerObj = {
  businessLayer_01,
  businessLayer_02,
  businessLayer_03,
  businessLayer_04,
  businessLayer_05,
  businessLayer_06,
  businessLayer_07,
  businessLayer_08,

  businessLayer_10,
  businessLayer_11,
  businessLayer_12,
  businessLayer_13,
  businessLayer_14,
  businessLayer_15,
  businessLayer_16,
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
        let layer = new arcgisModules.FeatureLayer(await layerObj[id].featureLayer());
        // layer.visible = true;
        map.add(layer);
        
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