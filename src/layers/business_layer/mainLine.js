// 输水线路图层设置
import {baseJson} from "@/network/staticData.js"

export async function featureLayer(){
  let template = {
    id: "businessLayer_01",
    title: "输水线路",
    minScale: 569000,
    visible: true,
    labelingInfo: {
      "labelExpressionInfo": {
        "expression": "$feature.name"
      },
      "labelPlacement": "center-along",
      "symbol": {
        "type": "text",
        "color": [50, 186, 251, 1],
        "haloSize": 1,
        "haloColor": "#ffffff",
        "font": {"size": 12}
      }
    },
    renderer: {
      "type": "unique-value",
      "field": "desc_",
      "uniqueValueInfos": [
        {
          "value": " ",
          "symbol": {
            "type": "simple-line",
            "miterLimit": 20,
            "width": 3,
            "color": "#00ffcd"
          },
          "label": "地上"
        },
        {
          "value": "箱涵",
          "symbol": {
            "type": "simple-line",
            "style": "short-dash",
            "miterLimit": 20,
            "width": 3,
            "color": [20, 180, 248, 1]
          },
          "label": "地下"
        }
      ]
    },
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "name", "type": "string"},
      {"name": "length", "type": "double"},
      {"name": "desc_", "type": "string"},
      {"name": "designDiversionLevel", "type": "string"},
      {"name": "designFlow", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "polyline",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/mainLine.json").then(res => {
    template.source = res;
  })

  return template;
}

// export default async function add2Map(map) {
//   let layer = new arcgisModules.FeatureLayer(await featureLayer());
//   if (!map.findLayerById('businessLayer_01')) {
//     map.add(layer);
//   };
//   layer.visible = true;
// }