
<template>
  <section>
    <div id="leafletMap" class="home" :style="{height: '90vh',width: '100vw' ,background:'#000'}"></div>
  </section>
</template>

<script>
import L from 'leaflet'
require('./util/tileLayer.baidu.js')
export default {
  props: {},
  data () {
    return {
      map: {},
      mark1: [{
        point: [22.50, 111.31],
        data: [30, 60, 58]
      },
      {
        point: [23.35, 111.42],
        data: [80, 40, 48]
      },
      {
        point: [24.35, 111.42],
        data: [30, 20, 48]
      }
      ]
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let that = this
      let map = L.map('leafletMap', {
        minZoom: 5,
        maxZoom: 14,
        // center: [37.54, 100.23],
        center: [22.50, 111.31],
        zoom: 8,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.Baidu,
        contextmenu: true,
        contextmenuWidth: 140, // 右键菜单功能
        contextmenuItems: [{
          text: '设置为起点',
          callback: that.setStartPoint
        },
        {
          text: '设置为中间点',
          callback: this.setWaypoints
        },
        {
          text: '设置为终点',
          callback: that.setStopPoint
        },
        '-',
        {
          text: '开始规划',
          callback: that.calcRoute
        }
        ]
      })
      L.tileLayer.baidu({ // 图层1
        layer: 'vec'
      }).addTo(map)
      L.tileLayer.baidu({ // 图层2
        layer: 'vecs'
      }).addTo(map)
      that.map = map
      that.initWork(that.mark1)
    },
    initWork (mark) {
      let that = this
      if (mark.length != 0) {
        for (var a = L.featureGroup().addTo(that.map), t = 0; t < mark.length; t++) {
          var n = mark[t].point
          var divIcon
          divIcon = L.divIcon({
            iconSize: [0, 0],
            popupAnchor: [0, -5],
            html: '<div style="width:100px;height:120px;" id="mark' + (t + 1) + '"></div>'
          })
          var o = L.marker(n, {
            icon: divIcon
          })
          a.addLayer(o)
        }

        this.setEcharts(mark)
      }
    },
    setEcharts (data) {
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const dataList = data[i].data
          var option = {
            // backgroundColor: 'rgb(255, 255, 255)',
            color: ['#54CDE9'],
            tooltip: {
              show: false
            },
            grid: {
              left: '8%',
              right: '2%',
              top: '10%',
              bottom: '20%'
            },
            xAxis: [{
              type: 'category',
              data: ['type1', 'type2', 'type3'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#fff',
                interval: 0,
                margin: 10,
                align: 'center'
              }
            }],
            yAxis: {
              show: false,
              type: 'value',
              min: 0,
              max: 100
            },
            series: [{
              name: '',
              type: 'pictorialBar',
              symbolSize: [15, 5],
              symbolOffset: [0, -2],
              symbolPosition: 'end',
              z: 12,
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#FFDE00',
                  fontWeight: 'bold'
                  // "formatter": "{c}%"
                }
              },
              itemStyle: {
                normal: {
                  color: (params) => {
                    let colors = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(254, 174, 162, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(253, 114, 112, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(123, 200, 255, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(53, 157, 245, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(251, 169, 128, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(247, 203, 107, 1)'
                    }
                    ])]
                    return colors[params.dataIndex]
                  },
                  barBorderRadius: [15, 15, 0, 0] // 圆角大小
                }
              },
              data: dataList
            },
            {
              type: 'pictorialBar',
              symbolSize: [15, 5],
              symbolOffset: [0, 2],
              z: 12,
              itemStyle: {
                normal: {
                  color: (params) => {
                    let colors = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(254, 174, 162, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(253, 114, 112, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(123, 200, 255, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(53, 157, 245, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(251, 169, 128, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(247, 203, 107, 1)'
                    }
                    ])]
                    return colors[params.dataIndex]
                  }
                }
              },
              data: dataList
            },
            {
              type: 'bar',
              showBackground: false,
              backgroundStyle: {
                color: 'rgba(216, 229, 247, 0.55)',
                borderRadius: [6, 6, 0, 0]
              },
              itemStyle: {
                normal: {
                  color: (params) => {
                    let colors = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(254, 174, 162, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(253, 114, 112, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(123, 200, 255, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(53, 157, 245, 1)'
                    }
                    ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(251, 169, 128, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(247, 203, 107, 1)'
                    }
                    ])]
                    return colors[params.dataIndex]
                  }
                }
              },
              barWidth: '15',
              data: dataList
            }
            ]
          }
          let idName = 'mark' + (i + 1)

          echarts.init(document.getElementById(idName)).setOption(option)
        }
      }
    },
    clearMarker () {
      $('.leaflet-marker-pane').empty()
    }

  }
}
</script>
