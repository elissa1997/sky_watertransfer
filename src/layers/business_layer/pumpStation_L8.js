// 八级泵站图层设置
import {transferApi} from "@/network/liveData.js"

const axios_params = {
  action: "getAllJsonB4",
  line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf"
}

export async function featureLayer() {
  let template = {
    id: "businessLayer_02",
    title: "八级泵站",
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
      "type": "unique-value",
      "field": "omcn",
      defaultSymbol: {

          "type": "picture-marker",
          "url": "/dist/icon/pumpStation_red_128_blink.gif",
          "width": 42,
          "height": 42
  
      },
      "uniqueValueInfos": [
        {
          "value": "-",
          "symbol": {
            "type": "picture-marker",
            "url": "/dist/icon/pumpStation_red_128.svg",
            "width": 20,
            "height": 20
          },
          "label": "机组全关"
        },
        {
          "value": "0",
          "symbol": {
            "type": "picture-marker",
            "url": "/dist/icon/pumpStation_red_128.svg",
            "width": 20,
            "height": 20
          },
          "label": "机组全关"
        }
      ]
    },
    labelsVisible: true,
    fields: [
      {"type": "oid","name": "FID"},
      {"type": "string","name": "name"},
      {"type": "string","name": "stcd"},
      {"type": "string","name": "designZ"},
      {"type": "string","name": "designMinZ"},
      {"type": "string","name": "designMaxZ"},
      {"type": "string","name": "designCZ"},
      {"type": "string","name": "designCMinZ"},
      {"type": "string","name": "designCMaxZ"},
      {"type": "string","name": "number"},
      {"type": "string","name": "z"},
      {"type": "string","name": "dwz"},
      {"type": "string","name": "mpQacc"},
      {"type": "string","name": "desc"},
      {"type": "string","name": "mpQi"},
      {"type": "string","name": "tm"},
      {"type": "string","name": "omcn"},
      {"type": "string","name": "omPwr"},
      {"type": "string","name": "installedPower"},
      {"type": "string","name": "q"},
      {"type": "string","name": "designZ"}
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