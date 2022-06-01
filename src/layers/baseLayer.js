import Vue from 'vue';

const arcgisModules = Vue.prototype.$arcgisModules;
const tdtTK = "0a068ad2215490375966b9e9eafdffc7";
export function initLayers(map) {
  //天地图矢量
  let tdt_vec_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });
  //天地图影像
  let tdt_img_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });
  //天地图地形
  let tdt_ter_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=ter_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });
  //天地图矢量标注
  let tdt_cva_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });
  //天地图影像标注
  let tdt_cia_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });
  //天地图地形标注
  let tdt_cta_w = new arcgisModules.WebTileLayer({
    urlTemplate:
      "http://{subDomain}.tianditu.gov.cn/DataServer?T=cta_w&x={col}&y={row}&l={level}&tk=" + tdtTK,
    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  });

  let ahsl_zh0717 = new arcgisModules.TileLayer({
    id: 'ahsl_zh',
    title: "水利综合图",
    url: "/arcgis/rest/services/AHSL_ZH0717/MapServer",
    copyright: "水科院"
  })

  // 全国影像图
  let AHSLIMG_CHINA = new arcgisModules.TileLayer({
    id: 'AHSLIMG_CHINA',
    title: "全国影像图",
    url: "/arcgis/rest/services/AHSLIMG_CHINA/MapServer",
  })
  // 安徽省影像图
  let AHSLIMG = new arcgisModules.TileLayer({
    id: 'AHSLIMG',
    title: "安徽省影像图",
    url: "/arcgis/rest/services/AHSLIMG/MapServer",
  })
  // 水系标注与边界
  let AHYX_ZH0717 = new arcgisModules.TileLayer({
    id: 'AHYX_ZH0717',
    title: "水系标注与边界",
    url: "/arcgis/rest/services/AHYX_ZH0717/MapServer",
  })

  const tdtImg = new arcgisModules.GroupLayer({id: "tdtImg", title: "天地图影像", visible: false});
  const tdtVec = new arcgisModules.GroupLayer({id: "tdtVec", title: "天地图矢量", visible: false});
  const tdtTer = new arcgisModules.GroupLayer({id: "tdtTer", title: "天地图地形", visible: false});
  const sl_zh = new arcgisModules.GroupLayer({id: "sl_zh", title: "水利综合", visible: true});
  const slImg = new arcgisModules.GroupLayer({id: "slImg", title: "水利影像", visible: false});

  tdtImg.addMany([tdt_img_w, tdt_cia_w]);
  tdtVec.addMany([tdt_vec_w, tdt_cva_w]);
  tdtTer.addMany([tdt_ter_w, tdt_cta_w]);
  sl_zh.addMany([ahsl_zh0717]);
  slImg.addMany([AHSLIMG_CHINA, AHSLIMG, AHYX_ZH0717])


  let baseLayers = [slImg, sl_zh];

  return baseLayers;
}