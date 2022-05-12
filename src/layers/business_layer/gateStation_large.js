// 八级泵站图层设置
import {transferApi} from "@/network/liveData.js"

const axios_params = {
  action: "getAllJsonS4",
  level: "30",
  line_cd: "7f73d92fd9bc4d6fad84f2311d96fbaf"
}

export async function featureLayer() {
  let template = {
    id: "businessLayer_03",
    title: "大型闸站",
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
        "url": "/dist/icon/waterGate_red_128.svg",
        "width": 20,
        "height": 20
      },
      "visualVariables": [
        {
        "type": "rotation",
        "field": "angle",
        "rotationType": "geographic"
        }
      ]
    },
    labelsVisible: true,
    fields: [
      {"type": "oid","name": "FID"},
      {"type": "string","name": "name"},
      {"type": "string","name": "stcd"},
      {"type": "string","name": "number"},
      {"type": "string","name": "gateH"},
      {"type": "string","name": "diversionZ"},
      {"type": "string","name": "z"},
      {"type": "string","name": "desc"},
      {"type": "string","name": "quote"},
      {"type": "string","name": "designQ"},
      {"type": "string","name": "tm"},
      {"type": "string","name": "dwz"},
      {"type": "string","name": "q"},
      {"type": "integer","name": "angle"}
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
    template.source = res.source.map(ele => {
      ele.attributes.quote = JSON.stringify(ele.attributes.quote);
      return ele;
    });
  })

  return template;
}