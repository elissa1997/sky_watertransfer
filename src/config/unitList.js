export function unitConfig() {
  let typeList = [
    {id: "1", type:"provincialAdmin", name: "省管单位"},
    {id: "2", type:"provincialStation", name: "省管站点"},
    {id: "3", type:"municipalAdmin", name: "市管单位"},
    {id: "4", type:"municipalStation", name: "市管站点"},
  ]

  let unitList = {
    // 省级管理单位
    provincialAdmin: [
      {unitCode: "010", name: "省管中心"}
    ],

    // 市级管理单位
    municipalAdmin: [
      {unitCode: "020", name: "蚌埠市水利局"},
      {unitCode: "030", name: "宿州市水利局"},
      {unitCode: "040", name: "淮北市水利局"},
    ],

    // 省管站点单位
    provincialStation: [
      {unitCode: "001", name: "何巷闸"},
      {unitCode: "002", name: "胡洼闸"},
      {unitCode: "003", name: "五河站"},
      {unitCode: "004", name: "固镇站"},
      {unitCode: "005", name: "四铺站"}
    ],

    // 市管站点单位
    municipalStation: [
      {unitCode: "006", name: "娄宋站"},
      {unitCode: "007", name: "宿州站"},
      {unitCode: "008", name: "候王站"},
      {unitCode: "009", name: "贾窝站"},
      {unitCode: "010", name: "岱山口站"},
    ]
  }

  return {
    typeList,
    unitList
  }
}