<template>
  <div id="app">
    <h1>高德在线地图</h1>
    <AMapTest />
    <!-- <h1>ECharts + 高德在线地图</h1>
    <EchartsMapTest /> -->
    <h1>MapLibre-GL + 自定义瓦片服务地图（天地图）</h1>
    <!-- <MaplibreglTest /> -->
    <MapLibreGLTest2 />
    <!-- <h1>Leaflet + 自定义瓦片服务地图（天地图）</h1> -->
    <LeafletTest
      :tileUrl="tileUrl"
      :center="center"
      :zoom="zoom"
      :data="data"
    />
  </div>
</template>

<script>
import AMapTest from "./AMapTest";
import EchartsMapTest from "./EchartsMapTest";
// import MaplibreglTest from "./MaplibreglTest";
import MapLibreGLTest2 from "./MapLibreGLTest2";
import LeafletTest from "./LeafletTest";

export default {
  name: "App",
  components: {
    AMapTest,
    EchartsMapTest,
    // MaplibreglTest,
    MapLibreGLTest2,
    LeafletTest,
  },
  data() {
    return {
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [0, 0],
      zoom: 1,
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
