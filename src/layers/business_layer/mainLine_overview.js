import Vue from 'vue';
import { baseJson } from "@/network/staticData.js";

const arcgisModules = Vue.prototype.$arcgisModules;

export default async function featureLayer(map){
  let template = {
    id: "mainLine_overview",
    title: "mainLine_overview",
    maxScale: 570000,
    visible: true,
    labelingInfo: {
      // "labelExpressionInfo": {
      //   "expression": "$feature.name"
      // },
      // "labelPlacement": "center-along",
      // "symbol": {
      //   "type": "text",
      //   "color": [50, 186, 251, 1],
      //   "haloSize": 1,
      //   "haloColor": "#ffffff",
      //   "font": {"size": 12}
      // }
    },
    renderer: {
      "type": "simple",
      "symbol": {
        type: "simple-line",
        width: 3,
        color: "#1890ff",
        // outline: {
        //   width: 0.5,
        //   color: "black"
        // }
      }
    },
    effect: "bloom(1, 0px 0)",
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "name", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "polyline",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/mainLine_overview.json").then(res => {
    template.source = res;
  })

  let layer = new arcgisModules.FeatureLayer(template);
  map.add(layer, 1);

}