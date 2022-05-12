<template>
  <div id="introduce" :class="{collapse: collapse}">
    <div class="title">工程概况</div>
    <div class="toggle" @click="collapse = !collapse">
        <component :is="(collapse)?'icon-menu-unfold-one':'icon-menu-fold-one'" theme="outline" size="24" fill="#099e07" :strokeWidth="3"/>
    </div>

    <a-tabs v-model="activeKey" class="tabs">
      <a-tab-pane key="1" tab="调水线路与规模">
        <div class="contentWarp">

          <div class="chaper">
            <p class="caption">调水水源</p>
            <p class="main">淮河干流水。蚌埠闸上水量通过何巷闸自流引水至香涧湖，蚌埠闸下水量经五河站抽水至香涧湖。</p>
            <p class="main">香涧湖水。香涧湖入湖径流优先满足当地原有用水需求后参与淮水北调工程统一调度。</p>
          </div>
          <div class="chaper">
            <p class="caption">水量分配</p>
            <p class="main">淮水北调近期多年平均引调水量<span class="num">2.8亿m³</span>，其中蚌埠市<span class="num">0.4亿m³</span>，宿州市<span class="num">1.2亿m³</span>，淮北市<span class="num">1.2亿m³</span>。</p>

          </div>
          <div class="chaper">
            <p class="caption">调水线路</p>
            <p class="main">淮水北调工程从何巷闸自流或五河泵站抽引淮河水入香涧湖，利用三八运河、新汴河等河道输水。提水泵站共8级，调水线路全长<span class="num">268.0km</span>。</p>

          </div>
          <div class="chaper">
            <p class="caption">调水规模</p>
            <p class="main">
              淮水北调工程规模为：出香涧湖<span class="num">36m³/s</span>，到灵璧闸上<span class="num">34m³/s</span>, 宿州闸上<span class="num">30m³/s</span>，
              四铺闸上<span class="num">18m³/s</span>，黄桥闸上<span class="num">15m³/s</span>，贾窝闸上<span class="num">3m³/s</span>，岱山口闸上<span class="num">2m³/s</span>。
            </p>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="水量调度">
        <div class="contentWarp">
          <div class="chaper">
            <p class="caption">调水量</p>
            <p class="main">
              淮水北调工程近期多年平均抽调水量<span class="num">2.8亿m³</span>，出香涧湖水量为<span class="num">2.6亿m³</span>，入新汴河水量为<span class="num">2.4亿m³</span>，
              入新沱河、萧濉新河水量为<span class="num">1.4亿m³</span>，入老岱河水量为<span class="num">0.2亿m³</span>。
            </p>
          </div>
          <div class="chaper">
            <p class="caption">调水时间</p>
            <p class="main">水量调度年度为每年1月~12月。</p>
          </div>
          <div class="chaper">
            <p class="caption">供水次序</p>
            <p class="main">(1) 淮北市(含濉溪县城)、宿州市(含符离集镇)两市工业用水。</p>
            <p class="main">(2) 蚌埠市固镇县城、宿州市灵璧县城、萧县县城的工业用水，香涧湖周边农业灌溉及输水沿线的生态补水。</p>
            <p class="main">(3) 萧县供水原则上应结合淮北市同期调水。</p>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';

export default {
  name: "introduce",
  props: {},
  components: {
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
  },
  data() {
    return {
      collapse: false,
      activeKey: "1"
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#introduce{
  @include animation_cubic-bezier;
  @include grossGlass;
  @include boxShadow;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 490px;
  height: $introduceHeight;

  ::v-deep .ant-tabs-tab-active {
    color: $mainColor;
  }

  ::v-deep .ant-tabs-tab:hover {
    color: $mainColorHover;
  }

  ::v-deep .ant-tabs-ink-bar {
    background-color: $mainColor;
  }
}

.title {
  font-size: 17px;
  font-weight: 700;
  color: $mainColor;
  padding: 5px 10px;
  border-bottom: 1px solid #00000017;
}

.collapse {
  right: -495px !important;
}

.tabs {

}

.toggle {
  @include grossGlass;
  @include boxShadow;
  padding: 5px;
  // border-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: absolute;
  left: -34px;
  top: calc(($introduceHeight - 34px) / 2);
  display: flex;
  align-items: center;
  ::v-deep .i-icon {
    margin-right: 0px;
  }
}

.contentWarp {
  height: calc($introduceHeight - 46px - 36.5px);
  padding: 10px 20px;
  overflow-y: auto;
  p {
    margin-bottom: 5px;
  }
  .chaper {
    margin-bottom: 15px;

    .caption {
      font-size: 16px;
      font-weight: 600;
    }

    .main {
      text-indent: 2em;
    }

    .num{
      font-size: 16px;
      color: #1890ff;
      font-weight: 600;
    }
  }
}
</style>