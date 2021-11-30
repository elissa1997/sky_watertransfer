import {baseJson} from "@/network/staticData.js"

export async function featureLayer() {
  let template = {
    id: "businessLayer_14",
    title: "宿州-蓄水工程",
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
          "width": 1,
          "color": [53,162,235,1]
        },
        "color": [21,163,239,0.25]
      }
    },
    labelsVisible: true,
    fields: [
      {"name": "FID","type": "oid"},
      {"name": "OBJECTID", "type": "integer"},
      {"name": "name","type": "string"},
      {"name": "area","type": "double"},
      {"name": "Shape_Leng","type": "double"},
      {"name": "Shape_Area","type": "double"},
      {"name": "YSDM","type": "string"},
      {"name": "YSMC","type": "string"},
      {"name": "CODE","type": "string"}
    ],
    outFields: ["*"],
    geometryType: "polygon",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/SZ_storage.json").then(res => {
    template.source = res;
  })
  return template;
}