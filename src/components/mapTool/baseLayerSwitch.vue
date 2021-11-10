<template>
  <div id="baseMapSwitch" :class="{isCollapse: collapse}">
    

      <div class="toggleBtn" @click="collapse = !collapse">
        <component :is="(collapse)?'icon-menu-unfold-one':'icon-menu-fold-one'" theme="outline" size="24" fill="#099e07" :strokeWidth="3"/>
      </div>

      <div class="warp">
        <div class="mapItem" v-for="map in baseMapList" :key="map.id" :class="{isVisible: map.visible}" @click="selectLayer(map.id)">
          <img :src="require('@/assets/mapCover/'+map.id+'.jpg')">
          <div class="lable">{{map.title}}</div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: "baseLayerSwitch",
  props: {
    map: {
      type: Object,
      default: undefined,
    }
  },
  data() {
    return {
      collapse: false,
      baseMapList: undefined
    }
  },
  methods: {
    selectLayer(id) {
      this.map.basemap.baseLayers.forEach((item,i) => {
          if (item.id == id) {
            item.visible = true;
            // this.baseMapList[i].visible = true;
          }else{
            item.visible = false;
            // this.baseMapList[i].visible = false;
          }

          this.$forceUpdate();
      })
    }

  },
  created() {
    
  },

  mounted() {
    this.baseMapList = this.map.basemap.baseLayers.items.reverse();
  }
  
}
</script>

<style lang="scss" scoped>
  #baseMapSwitch {
    display: flex;
    position: absolute;
    top:10px;
    right: 10px;
    border-radius: 5px;
    // background-color: #ffffff71;
    // backdrop-filter: blur(7px);
    // box-shadow: 0px 0px 10px #0000002e;
    // transition: all cubic-bezier(0.46, 0.03, 0.52, 0.96) 0.5s;

    width: 427px;
    overflow: hidden;

    @include grossGlass;
    @include boxShadow;
    @include animation_cubic-bezier;
  }

  .warp {
    width: 427px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .toggleBtn {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 5px;
    background-color: #ffffffbd;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    box-shadow: 2px 0px 9px -5px #00000059;
    ::v-deep .i-icon{
      height: 24px;
    }
  }



  .mapItem {
    position: relative;
    width: 70px;
    height: 70px;
    cursor: pointer;
    border-radius: 5px;
    margin: 10px;

    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }

    .lable {
      border-radius: 5px;

      position: absolute;
      display: table-cell;
      bottom: 0px;
      font-size: 12px;
      padding-top: 20px;
      padding-bottom: 5px;
      width: 100%;
      text-align: center;
      vertical-align: bottom;
      color: #fff;
      background: linear-gradient(0deg, #00000082, #00000000);
    }
  }



  .isVisible {
    box-shadow: 0px 0px 10px 2px #1cc111;
  }

  .isCollapse {
    width: 124px !important;
  }
</style>