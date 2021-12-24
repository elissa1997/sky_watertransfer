import {baseJson} from "@/network/staticData.js"

export async function featureLayer(){
  let template = {
    id: "businessLayer_32",
    title: "淮北-线路",
    visible: true,
    // labelingInfo: {
    //   "labelExpressionInfo": {
    //     "expression": "$feature.name"
    //   },
    //   "labelPlacement": "center-along",
    //   "symbol": {
    //     "type": "text",
    //     "color": [50, 186, 251, 1],
    //     "haloSize": 1,
    //     "haloColor": "#ffffff",
    //     "font": {"size": 12}
    //   }
    // },
    renderer: {
      "type": "unique-value",
      "field": "pro_type",
      "uniqueValueInfos": [
        {
          "value": "0",
          "symbol": {
            "type": "simple-line",
            "miterLimit": 20,
            "width": 3,
            "color": [89,173,49, 1]
          },
          "label": "输水明渠"
        },
        {
          "value": "1",
          "symbol": {
            "type": "simple-line",
            "style": "dash",
            "miterLimit": 20,
            "width": 3,
            "color": [147,205,86, 1]
          },
          "label": "输水箱涵"
        }
      ]
    },
    labelsVisible: false,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "pro_type", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "polyline",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/HB_line.json").then(res => {
    template.source = res;
  })

  return template;
}
