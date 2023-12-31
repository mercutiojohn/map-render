require('proj4')
require('proj4leaflet')
const L = require('leaflet')
// 本地百度地图离线瓦片地图   项目需要叠加底图，所以要两个。不需要叠加的，一个就好
const titleO = '/map/amap/overlay/{z}/{x}/{y}.png'
const titleS = '/map/amap/satellite/{z}/{x}/{y}.jpg'
 
var urlPath = titleO
var urlPathS = titleS
//请引入 proj4.js 和 proj4leaflet.js
L.CRS.Baidu = new L.Proj.CRS(
  'EPSG:900913',
  '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  {
    resolutions: (function () {
      const level = 19
      var res = []
      res[0] = Math.pow(2, 18)
      for (var i = 1; i < level; i++) {
        res[i] = Math.pow(2, 18 - i)
      }
      return res
    })(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
  }
)
 
L.tileLayer.baidu = function (option) {
  option = option || {}
 
  var layer
  var subdomains = '0123456789'
  switch (option.layer) {
    //底图
    case 'vec':
    default:
      layer = L.tileLayer(urlPath, {
        name: option.name,
        subdomains: subdomains,
        tms: true,
        zIndex:400
      })
 
      break
          //卫星图
    case 'vecs':
        layer = L.tileLayer(urlPathS, {
          name: option.name,
          subdomains: subdomains,
          tms: true,
          zIndex:200
        })
  
        break
    case 'img_d':
      layer = L.tileLayer(
        'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
        {
          name: option.name,
          subdomains: subdomains,
          tms: true,
        }
      )
      break
    case 'img_z':
      layer = L.tileLayer(
        'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=' +
          (option.bigfont ? 'sh' : 'sl') +
          '&v=020',
        {
          name: option.name,
          subdomains: subdomains,
          tms: true,
        }
      )
      break
 
    case 'custom': //Custom 各种自定义样式
      //可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
      break
 
    case 'time': //实时路况
      var time = new Date().getTime()
      layer = L.tileLayer(
        'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time=' +
          time +
          '&label=web2D&v=017',
        {
          name: option.name,
          subdomains: subdomains,
          tms: true,
        }
      )
      break
 
    //合并
    case 'img':
      layer = L.layerGroup([
        L.tileLayer.baidu({
          name: '底图',
          layer: 'img_d',
          bigfont: option.bigfont,
        }),
        L.tileLayer.baidu({
          name: '注记',
          layer: 'img_z',
          bigfont: option.bigfont,
        }),
      ])
      break
  }
  return layer
}