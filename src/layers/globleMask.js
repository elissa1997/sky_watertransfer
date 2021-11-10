// 全球遮罩图层
import Vue from 'vue';
import { getBaseJson } from "@/network/staticData.js";

const arcgisModules = Vue.prototype.$arcgisModules;

async function getData() {
  let data = undefined;
  await getBaseJson("Huai_NorthTransfer_mask.json").then(res => {
    data = res;
  })
  return data;
}

export default async function createLayer(map) {
  let graphicMask = new arcgisModules.Graphic({
    geometry: await getData(), // set geometry here
    symbol: {
      type: "simple-fill",
      outline: { color: [0, 0, 0, 0.10] },
      color: [0, 0, 0, 0.30]
    } // set symbol here
  })

  let layerMask = new arcgisModules.GraphicsLayer({
    graphics: [graphicMask]
  });

  map.add(layerMask);
  console.log("全球遮罩加载完成");
}
