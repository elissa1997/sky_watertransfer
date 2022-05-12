import createCustomDynamic from "./createCustomDynamic.js";

export default async function createLayer(map, view) {

  let imageLayer = new createCustomDynamic({
    view: view,
    maxScale: 570000,
    picUrl: "/dist/images/Huai_NorthTransfer_mapLayer.png",
    extent: { 
      ymax: 34.766007, 
      xmax: 120.043167, 
      ymin: 32.546512,
      xmin: 114.467201, 
      "spatialReference": {
        "wkid": 4326
      }
    }
    // extent: {xmin: 114.5, ymin: 28.96, xmax: 120.00, ymax: 35.01}
  })
  console.log("加载图片图层");
  map.add(imageLayer);
}