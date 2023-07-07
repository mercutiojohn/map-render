<template>
  <div>
    {{ ev.target }}
    <div id="container"></div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
      //map:null,
      ev: "",
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "bd4741cb25554750b1cfc08d1ed1d26e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale,AMap.Marker,AMap.InfoWindow"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.amapObj = AMap;
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 5, //初始化地图级别
            center: [117.120217, 36.652669], //初始化地图中心点位置
          });
          this.addEvents();
          this.addMarker();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addEvents() {
      this.map.on("complete", function () {
        // 地图图块加载完成后触发
        console.log("【地图加载完毕】");
      });
      this.map.on("click", function (ev) {
        // 触发事件的对象
        var target = ev.target;
        // 触发事件的地理坐标，AMap.LngLat 类型
        var lnglat = ev.lnglat;
        // 触发事件的像素坐标，AMap.Pixel 类型
        var pixel = ev.pixel;
        // 触发事件类型
        var type = ev.type;
        console.log("【info】", target, lnglat, pixel, type);
        this.ev = ev;
      });
    },
    addMarker() {
      var marker = new this.amapObj.Marker({
        position: [117.120217, 36.652669],
        map: this.map,
        label: {
          content: "山东济南",
          offset: new this.amapObj.Pixel(10, -20),
        },
      });

      var infoWindow = new this.amapObj.InfoWindow({
        content: "<h4>标题</h4><p>内容</p>",
        offset: new this.amapObj.Pixel(0, -30),
      });

      marker.on("click", () => {
        infoWindow.open(this.map, marker.getPosition());
      });
    },
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
    window._AMapSecurityConfig = {
      securityJsCode: "0bcaafbf05b634083574ebe7f73835ea",
    };
  },
};
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>