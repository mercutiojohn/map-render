<template>
  <div id="app">
    <!-- <h1>高德在线地图</h1>
    <AMapTest /> -->
    <!-- <h1>ECharts + 高德在线地图</h1>
    <EchartsMapTest /> -->
    <!-- <h1>MapLibre-GL + 自定义瓦片服务地图（天地图）</h1> -->
    <!-- <MaplibreglTest /> -->
    <!-- <MapLibreGLTest2 /> -->
    <!-- <h1>Leaflet + 自定义瓦片服务地图（天地图）</h1> -->
    <div class="map-container" v-if="loaded">
      <LeafletTest
        v-if="renderer === 'leaflet'"
        :tileUrl="tileUrl"
        :markTileUrl="markTileUrl"
        :center="center"
        :zoom="zoom"
        :data="data"
      />
      <!-- <MapLibreGLTest2
        v-if="renderer === 'maplibregl'"
        :tileUrl="tileUrl"
        :center="center"
        :zoom="zoom"
        :data="data"
      /> -->
      <MapLibreGLTest3
        v-if="renderer === 'maplibregl'"
        :tileUrl="tileUrl"
        :markTileUrl="markTileUrl"
        :center="center"
        :zoom="zoom"
        :pitch="20"
        :data="data"
      />
    </div>
    <div class="properties">
      <el-form>
        <el-form-item label="地图引擎">
          <el-select v-model="renderer" placeholder="请选择">
            <el-option
              v-for="item in mapRenderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="地图">
          <el-select v-model="source" placeholder="请选择" disabled>
            <el-option
              v-for="item in mapSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          {{source}}
        </el-form-item>
        <el-form-item label="底图">
          <el-select v-model="markSource" placeholder="请选择" disabled>
            <el-option
              v-for="item in mapSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          {{markSource}}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="底图来源">
          <el-select v-model="mapSource" placeholder="请选择">
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="底图类型">
          <el-select v-model="baseType" placeholder="请选择">
            <el-option
              v-for="item in baseTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标记来源">
          <el-select v-model="markMapSource" placeholder="请选择">
            <el-option
              v-for="item in markSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线">
          <el-switch v-model="remote"></el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AMapTest from "./AMapTest";
import EchartsMapTest from "./EchartsMapTest";
// import MaplibreglTest from "./MaplibreglTest";
import MapLibreGLTest2 from "./MapLibreGLTest2";
import MapLibreGLTest3 from "./MapLibreGLTest3";
import LeafletTest from "./LeafletTest";

export default {
  name: "App",
  components: {
    AMapTest,
    EchartsMapTest,
    // MaplibreglTest,
    MapLibreGLTest2,
    MapLibreGLTest3,
    LeafletTest,
  },
  data() {
    return {
      TDT_KEY: "88f3c1aa7e87a1daa0176fe655a92030",
      loaded: true,
      // tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // source: "tianditu-image-remote",
      mapSource: "amap",
      baseType: "satellite",
      markMapSource: "amap",
      renderer: "leaflet",
      remote: true,
      center: [117.044702, 36.642555],
      zoom: 18,
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
      ],
      baseTypeOptions: [
        {
          label: "卫星",
          value: "satellite",
        },
        {
          label: "矢量",
          value: "image",
        },
        {
          label: "地形",
          value: "terrain",
        },
      ],
      sourceOptions: [
        {
          label: "高德",
          value: "amap",
        },
        {
          label: "天地图",
          value: "tianditu",
        },
        {
          label: "OpenStreetMap",
          value: "openstreetmap",
        },
      ],
      markSourceOptions: [
        {
          label: "高德",
          value: "amap",
        },
        {
          label: "天地图",
          value: "tianditu",
        },
      ],
      mapRenderOptions: [
        {
          label: "MapLibreGL",
          value: "maplibregl",
        },
        {
          label: "LeafLet",
          value: "leaflet",
        },
      ],
      mapSourceOptions: [
        // {
        //   label: "Google卫星",
        //   value: "google-satellite",
        // },
        // {
        //   label: "Google矢量",
        //   value: "google-image",
        // },
        // {
        //   label: "Google地形",
        //   value: "google-terrain",
        // },
        {
          label: "高德卫星-本地",
          value: "amap-satellite",
        },
        {
          label: "高德卫星-在线",
          value: "amap-satellite-remote",
        },
        {
          label: "高德标签-本地",
          value: "amap-cover",
        },
        {
          label: "高德矢量-本地",
          value: "amap-image",
        },
        {
          label: "高德矢量-在线",
          value: "amap-image-remote",
        },
        {
          label: "天地图卫星-本地",
          value: "tianditu-satellite",
        },
        {
          label: "天地图矢量-本地",
          value: "tianditu-image",
        },
        {
          label: "天地图标签-本地",
          value: "tianditu-cover",
        },
        {
          label: "天地图卫星-在线",
          value: "tianditu-satellite-remote",
        },
        {
          label: "天地图矢量-在线",
          value: "tianditu-image-remote",
        },
        {
          label: "天地图地形-在线",
          value: "tianditu-terrain-remote",
        },
        {
          label: "天地图标签-在线",
          value: "tianditu-cover-remote",
        },
        {
          label: "OpenStreetMap-在线",
          value: "openstreetmap-image-remote",
        },
      ],
    };
  },
  watch: {
    source() {
      this.loaded = false;
      setTimeout(() => {
        this.loaded = true;
      }, 100);
    },
    markSource() {
      this.loaded = false;
      setTimeout(() => {
        this.loaded = true;
      }, 100);
    },
  },
  computed: {
    source() {
      return `${this.mapSource}-${this.baseType}${
        this.remote ? "-remote" : ""
      }`;
    },
    markSource() {
      return `${this.markMapSource}-cover${this.remote ? "-remote" : ""}`;
    },
    tileUrl() {
      if (this.source === "openstreetmap-image-remote") {
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      } else if (this.source === "tianditu-satellite-remote") {
        return `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.TDT_KEY}`;
      } else if (this.source === "tianditu-image-remote") {
        return `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.TDT_KEY}`;
      } else if (this.source === "tianditu-terrain-remote") {
        return `https://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.TDT_KEY}`;
      } else if (this.source === "amap-satellite-remote") {
        return `http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`;
      } else if (this.source === "amap-image-remote") {
        return `http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`;
      } else {
        return `http://localhost:2018/server/map/${this.source}/{x}/{y}/{z}`;
      }
    },
    markTileUrl() {
      if (this.markSource === "openstreetmap-cover-remote") {
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      } else if (this.markSource === "tianditu-cover-remote") {
        return `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.TDT_KEY}`;
      } else if (this.markSource === "amap-cover-remote") {
        return `http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8`;
      } else {
        return `http://localhost:2018/server/map/${this.markSource}/{x}/{y}/{z}`;
      }
    },
  },
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.map-container {
  width: calc(100% - 300px);
  height: 100vh;
}
#app {
  display: flex;
}
.properties {
  width: 300px;
  padding: 20px;
}
</style>