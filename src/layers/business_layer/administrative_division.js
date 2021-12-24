import {baseJson} from "@/network/staticData.js"

export async function featureLayer() {
  let template = {
    id: "businessLayer_09",
    title: "行政区划",
    visible: true,
    labelingInfo: {
      "labelExpressionInfo": {
        expression: "$feature.name"
      },
      "labelPlacement": "center-center",
      "symbol": {
        "type": "text",
        "color": [255, 111, 33, 0.87],
        "haloSize": 1,
        "haloColor": "#fffa21de",
        "font": {"size": 12}
      }
    },
    renderer: {
      // "type": "simple",
      // "symbol": {
      //   "type": "picture-marker",
      //   "url": "/dist/icon/waterUser_128.svg",
      //   "width": 18,
      //   "height": 18
      // }
      "type": "unique-value",
      "field": "name",
      "uniqueValueInfos": [
        {
          "value": "宿州市",
          "symbol": {
            "type": "simple-fill",
            "outline": { "color": [0, 0, 0, 0.18] },
            "color": [255, 198, 33, 0.25]
          }
        },
        {
          "value": "淮北市",
          "symbol": {
            "type": "simple-fill",
            "outline": { "color": [0, 0, 0, 0.18] },
            "color": [33, 255, 95, 0.25]
          }
        },
        {
          "value": "蚌埠市",
          "symbol": {
            "type": "simple-fill",
            "outline": { "color": [0, 0, 0, 0.18] },
            "color": [33, 148, 255, 0.25]
          }
        },
      ]
    },
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "name", "type": "string"},
      {"name": "code", "type": "string"},
    ],
    outFields: ["*"],
    geometryType: "polygon",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/administrative_division.json").then(res => {
    template.source = res;
  })

  return template;
}