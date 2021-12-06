// 八级泵站图层设置
import {baseJson} from "@/network/staticData.js"

export async function featureLayer() {
  let template = {
    id: "businessLayer_07",
    title: "湖泊",
    visible: true,
    labelingInfo: {
      "labelExpressionInfo": {
        expression: "$feature.name"
      },
      "labelPlacement": "center-center",
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
        "type": "simple-fill",
        "outline": {
          "style": "none"
        },
        "color": [10,122,196,0.59]
      }
    },
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "OBJECTID", "type": "double"},
      {"name": "Id", "type": "double"},
      {"name": "Shape_Leng", "type": "double"},
      {"name": "Shape_Area", "type": "double"},
      {"name": "name", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "polygon",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/lake.json").then(res => {
    template.source = res;
  })
  return template;
}