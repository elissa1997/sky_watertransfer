# 淮水北调线路_2.0

## 已安装第三方依赖

- [x] IconPark
- [x] Arcgis
- [x] AntVue(按需)
- [x] dayjs
- [x] echarts
- [ ] gcoord
- [ ] qs
- [x] v-viewer

## 整体结构

![结构图](http://assets.processon.com/chart_image/61c56d121efad45a2b435ed7.png)

[点击查看矢量图](https://www.processon.com/view/link/61c5960d1e085364150c6cc9)

## 文件规划

- **views，页面文件夹**
  
  - gis2d.vue，地图主文件
  - command，调水指令相关文件夹

- **components，组件文件夹**

  - mapTool，地图相关组件
    - layerTree.vue，图层控制树
    - baseLayerSwitch.vue，底图切换
    - displayCommand.vue，指令显示（已隐藏）
    - infoPanel，信息窗口（年内调水信息、测站实时信息、取水信息）

  - modal，所有一级弹窗组件（不包括弹窗内部的嵌套弹窗）

    - pumpStation，泵站详情
    - gateStation，闸站详情
    - featurePopup.vue，Arcgis点击后小弹窗
    - videoIframe.vue，视频站点（Iframe）
    - waterUserAllTable.vue，所有取水户详细表格

  - public，公共组件

    - dateRangeGroup.vue，按日月年选择日期范围
    - loading.vue，加载动画（可传入高度）
    - noData.vue，无数据提示（可传入高度）
    - pdfView.vue，pdf浏览

  - button，地图按钮

  - command，调水指令组件

- **layers，图层文件夹**

  - layerAgent.js，图层集中引入，并根据控制树控制
  - baseLayer.js，底图图层
  - globleMask.js，全球遮罩
  - bussiness_layer，各个业务图层