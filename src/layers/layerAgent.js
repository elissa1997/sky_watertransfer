import Vue from 'vue';

const arcgisModules = Vue.prototype.$arcgisModules;

import globleMask from "@/layers/globleMask.js";

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
      // 已勾选
      if (isLoadOnMap) {
        // 地图已加载该图层，不操作

      }else{
        // 地图未加载该图层，先加载图层
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
    console.log(id, isChecKeys, isLoadOnMap);

  });
}