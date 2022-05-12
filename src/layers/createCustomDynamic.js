import Vue from 'vue';
const arcgisModules = Vue.prototype.$arcgisModules;

export default arcgisModules.BaseDynamicLayer.createSubclass({
  properties: {
    view: null,
    id: null,
    title: null,
    picUrl: null,
    extent: null,
    opacity: null,
    canvas: null,
    image: null,
  },

  // Override the getImageUrl() method to generate URL
  // to an image for a given extent, width, and height.
  getImageUrl: function (extent, width, height) {
    return this.picUrl
  },
  // Fetches images for given extent and size
  fetchImage: function (extent, width, height) {
    let url = this.getImageUrl(extent, width, height);
    // request for the image  based on the generated url
    return arcgisModules.request(url, {
      responseType: "image"
    })
      .then(function (response) {
        let canvas = document.createElement("canvas");
        let image = response.data;
        // 创建canvas DOM元素，并设置其宽高和图片一样
        canvas.width = width;
        canvas.height = height;
        let wkid = 4326;
        if (this.extent.spatialReference && this.extent.spatialReference.wkid) {
          wkid = this.extent.spatialReference.wkid
        }

        //屏幕分辨率较高的时候会造成接口方法的参数extent 的屏幕坐标不是从0，0开始。在这里做一下转换
        const mapPoint1 = {
          x: extent.xmin,
          y: extent.ymax,
          spatialReference: extent.spatialReference 
        };
        const screenPoint1 = this.view.toScreen(mapPoint1);
        //console.log(screenPoint1)

        //左上角地理坐标转换屏幕坐标,为了获取canvas绘制图片的起点
        const mapPoint = {
          x: this.extent.xmin,
          y: this.extent.ymax,
          spatialReference: {
            wkid: wkid
          }
        };
        const screenPoint = this.view.toScreen(mapPoint);

        //根据extent范围计算canvas绘制图片的宽度以及高度
        //左下角
        const leftbottom = {
          x: this.extent.xmin,
          y: this.extent.ymin,
          spatialReference: {
            wkid: wkid
          }
        };
        const screen_leftbottom = this.view.toScreen(leftbottom);

        //右上角
        const righttop = {
          x: this.extent.xmax,
          y: this.extent.ymax,
          spatialReference: {
            wkid: wkid
          }
        };
        const screen_righttop = this.view.toScreen(righttop);

        let context = canvas.getContext("2d");
        width = Math.abs(screen_righttop.x - screen_leftbottom.x)
        height = Math.abs(screen_righttop.y - screen_leftbottom.y)
        // Apply destination-atop operation to the image returned from the server
        context.fillStyle = "rgba(255, 255, 255, 0)";
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = "destination-atop";
        context.globalAlpha = this.opacity
        context.drawImage(
          image,
          screenPoint.x -screenPoint1.x,
          screenPoint.y -screenPoint1.y,
          width,
          height);
        return canvas;
      }.bind(this));
  },

  createCanvas: function () {
    let canvas = document.createElement('canvas');
    canvas.width = this.view.width;
    canvas.height = this.view.height;
    //canvas.setAttribute("id","heatmap");
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    let parent = document.getElementsByClassName("esri-view-surface")[0];
    parent.appendChild(canvas);
    this.canvas = canvas;
    //this.context = document.getElementById("heatmap").getContext('2d');
    this.context = canvas.getContext("2d");
    //监听图层显示和隐藏事件，控制canvas显示和隐藏
    arcgisModules.watchUtils.watch(this, 'visible', function (newVal) { 
        if(newVal)
        {
            this.canvas.style.visibility='visible';
            this.refresh();
        }
    
        else
        {
            if(this.canvas)
            this.canvas.style.visibility='hidden';
        }
        
    });
    arcgisModules.watchUtils.watch(this, 'opacity', function (newVal) { 
        if(this.context)
        this.refresh();
        
    });
  },
  removeCanvas: function () {
      let parent = document.getElementsByClassName("esri-view-surface")[0];
      if (this.canvas)
          document.removeChild(this.canvas)
  }
})