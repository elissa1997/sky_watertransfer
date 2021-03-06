// 八级泵站图层设置
import {baseJson} from "@/network/staticData.js"

export async function featureLayer() {
  let template = {
    id: "businessLayer_05",
    title: "小型闸站",
    visible: true,
    labelingInfo: {
      "labelExpressionInfo": {
        expression: "$feature.name"
      },
      "labelPlacement": "below-center",
        "symbol": {
        "type": "text",
        "color": "black",
        "haloSize": 1,
        "haloColor": "#ffffff",
        "font": {"size": 12}
      }
    },
    renderer: {
      "type": "simple",
      "symbol": {
        "type": "picture-marker",
        "url": "/dist/icon/waterGate_gray_100.svg",
        "width": 20,
        "height": 20
      }
    },
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "name", "type": "string"},
      {"name": "x_coord", "type": "string"},
      {"name": "y_coord", "type": "string"},
      {"name": "height", "type": "integer"},
      {"name": "desc", "type": "string"},
      {"name": "stcd", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "point",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/gateStation_small.json").then(res => {
    template.source = res;
  })
  return template;
}