import {baseJson} from "@/network/staticData.js"

export async function featureLayer() {
  let template = {
    id: "businessLayer_10",
    title: "淮北-取水户",
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
        "url": "/dist/icon/waterUser_128.svg",
        "width": 18,
        "height": 18
      }
    },
    labelsVisible: true,
    fields: [
      {"name": "FID", "type": "oid"},
      {"name": "addvcd", "type": "string"},
      {"name": "ennmcd", "type": "string"},
      {"name": "name", "type": "string"},
      {"name": "cods", "type": "string"},
      {"name": "cert_num_mp_cds", "type": "string"}
    ],
    outFields: ["*"],
    geometryType: "point",
    spatialReference: {
      "wkid": 102100
    },
    objectIdField: "FID",
    source: []
  }

  await baseJson("layer/HB_user.json").then(res => {
    template.source = res;
  })
  return template;
}