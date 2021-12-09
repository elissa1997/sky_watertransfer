// 八级泵站图层设置
import {transferApi} from "@/network/liveData.js"

const axios_params = {
  action: "getAllJsonS4",
  level: "20",
  line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf"
}

export async function featureLayer() {
  let template = {
    id: "businessLayer_04",
    title: "中型闸站",
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
        "url": "/dist/icon/waterGate_purple_110.svg",
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

  await transferApi(axios_params).then(res => {
    template.source = res.source;
  })

  return template;
}