<template>
  <div ref="mapEl" class="map"></div>
</template>

<script>
import maplibregl from "maplibre-gl";

export default {
  mounted() {
    const MY_KEY = "88f3c1aa7e87a1daa0176fe655a92030";
    const initOption = {
      style: {
        version: 8,
        id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
        sources: {
          "tdt-vec": {
            type: "raster",
            tiles: [
              `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`,
            ],
            tileSize: 256,
          },
          "tdt-cva": {
            type: "raster",
            tiles: [
              `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`,
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "tdt-tiles-layer",
            type: "raster",
            source: "tdt-vec",
          },
          {
            id: "tdt-cva-layer",
            type: "raster",
            source: "tdt-cva",
          },
        ],
      },
    };

    const map = new maplibregl.Map({
      container: this.$refs.mapEl,
      ...initOption,
    });
  },
};
</script>

<style scoped>
.map {
  width: 600px;
  height: 300px;
}
</style>
