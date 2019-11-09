<template>
    <div id="drawMap" class="layout">
        <div style="height:500px" id="container" tabindex="0"></div>
    </div>
</template>

<script>
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  var map
  export default {
      data() {
        return {
          mapStyles:[{styleName:'远山黛',styleValue:'whitesmoke'},{styleName:'雅士灰',styleValue:'grey'}],
          drawToolsData:[
            {label:'热源',value:'reyuan',icon:'icon-icon-test1'},
            {label:'首站',value:'shouzhan',icon:'icon-start-copy'},
            {label:'换热站',value:'huanre',icon:'icon-transform'},
          ],

        }
      },
      mounted () {
        // this.init();
        // this.svgMarker();
      },
      methods: {
        init() {
          map = new AMap.Map('container', {
            center: [116.53381,39.88339],
            resizeEnable: true,
            zoom: 13,
            lang: 'ch',
            mapStyle: "amap://styles/grey" ,//初始化地图皮肤
          })


        },
        svgMarker(){
          AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
            if (!SvgMarker.supportSvg) {
               alert('当前环境不支持SVG');
            }
            var marker1 = new SvgMarker(
               new SvgMarker.Shape.IconFont({
                   symbolJs: '//at.alicdn.com/t/font_1209716_mowibqmgf5.js',
                   icon: 'icon-icon-test2',
                   size: 100,
                   offset: [0, -100],
                   fillColor: 'green'
               }), {
                   map: map,
                   position: [116.53381,39.88339],
                   showPositionPoint: true
               }
            );
          });
        },
        //换肤
        setMapStyle(value){
          var styleName = "amap://styles/" + value;
          map.setMapStyle(styleName);
        }
      },
      mounted () {
        this.init()
      },
      methods: {
        init: function () {
          map = new AMap.Map('container', {
            center: [116.397428, 39.90923],
            resizeEnable: true,
            zoom: 10,
            lang: 'ch'
          })
          AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
          })
        }
      }
  }
</script>
<style>
    @import "../../../../less/layout.css";
    html,body{
     margin: 0; padding: 0;
    }
    /* =========绘制工具局域栏样式start=========== */
    /* 使用svg图标必加的样式 */
    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
     }
    .legend{
      font-size: 16px;
      color:#3399FF;
    }
    /* =========绘制工具局域栏样式end=========== */


</style>
