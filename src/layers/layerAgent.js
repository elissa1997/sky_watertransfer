import Vue from 'vue';

const arcgisModules = Vue.prototype.$arcgisModules;
import globleMask from "@/layers/globleMask.js";

import * as bussiness_01 from "@/layers/bussiness_layer/mainLine.js";
import * as bussiness_02 from "@/layers/bussiness_layer/pumpStation_L8.js";
import * as bussiness_03 from "@/layers/bussiness_layer/gateStation_large.js";
import * as bussiness_04 from "@/layers/bussiness_layer/gateStation_medium.js";
import * as bussiness_05 from "@/layers/bussiness_layer/gateStation_small.js";
import * as bussiness_06 from "@/layers/bussiness_layer/culvert.js";
import * as bussiness_07 from "@/layers/bussiness_layer/lake.js";
import * as bussiness_08 from "@/layers/bussiness_layer/video.js";

import * as bussiness_10 from "@/layers/bussiness_layer/HB_user.js";
import * as bussiness_11 from "@/layers/bussiness_layer/HB_storage.js";
import * as bussiness_12 from "@/layers/bussiness_layer/HB_line.js";
import * as bussiness_13 from "@/layers/bussiness_layer/SZ_user.js";
import * as bussiness_14 from "@/layers/bussiness_layer/SZ_storage.js";
import * as bussiness_15 from "@/layers/bussiness_layer/SZ_line.js";
import * as bussiness_16 from "@/layers/bussiness_layer/BB_user.js";

// 默认加载图层
export function loadDefaultLayers(map) {
  globleMask(map);
}

// 控制树控制
export function handlerLayerByTree(map, checkKeys, allLayerId) {
  allLayerId.forEach(id => {
    let isChecKeys = checkKeys.find(layer => layer.layerId == id)
    let isLoadOnMap = map.findLayerById(id);
    if (isChecKeys) {
      // console.log(id, isChecKeys, isLoadOnMap);
      // 已勾选
      if (!isLoadOnMap) {

        /**
         * 地图已加载该图层，不操作
         * 地图未加载该图层，先加载图层 
        */
        // let layer = bussiness_01
      }

      // 根据fid更新要素
    }else{
      // 未勾选
      if (isLoadOnMap) {
        // 地图已加载该图层，visible设为false
        // isLoadOnMap.visible = false;

      }else{
        // 地图未加载该图层，不操作
      }
    }

  });
}

export async function layerTest(map) {
  // console.log(await bussiness_11.featureLayer());
  let layer = new arcgisModules.FeatureLayer(await bussiness_08.featureLayer());
  map.add(layer);
}