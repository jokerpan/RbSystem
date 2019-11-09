<template>
    <div id="draw" class="layout">
      <!-- 换肤normal-->
      <div id="map-styles" >
         <el-button v-for="(styles,index) in mapStyles"  :key="index" size="mini" @click="setMapStyle(styles.styleValue)">{{styles.styleName}}</el-button>
      </div>
      <!-- 图例、图层控制 -->
      <div id="drawMap">
          <span v-for="(item, index) in drawToolsData" :key="index"  @click="changeLayer(item.value, index);" style="display: inline-block;">
            <!-- <svg class="icon legend" aria-hidden="true">
               <use  :xlink:href="`${'#'+item.icon}`"></use>
            </svg> -->
            <i :class="`${'iconfont'+' '+'legend'+' '+item.icon}`"></i>
            <span>{{item.label}}</span>
          </span>
      </div>
      <!-- 右侧信息栏 -->
      <div style="height:500px" id="container" ></div>
    </div>

</template>

<script>
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  var map
  var line  //一级线对象 绘画
  var path  //一级线的路径

  var secondaryPipeLine  //二级线对象 绘画
  var secondaryPipePath  //二级线的路径

  //存放后台请求的线数据
  // var pathPoints = {
  //    primaryPipe : [],
  //    secondaryPipe : [],
  // }
  //存放Polyline对象
  // var polyline = {
  //   primaryPipeLine : {},
  //   secondaryPipeLine : {}
  // }

  //存放后台请求的点的集合
  var markerPoints = {
    heatSourceMarkerPoints : [],
    originStationMarkerPoints : [],
    exchangeStationMarkerPoints : []
  }
  //存放svg对象图标数组
  var svgMarkerArr={
    heatSourceMarkerArr : [],
    originStationMarkerArr : [],
    exchangeStationMarkerArr : [],
  }

  export default {
      data() {
        return {
          mapStyles:[{styleName:'远山黛',styleValue:'whitesmoke'},{styleName:'雅士灰',styleValue:'grey'}],
          drawToolsData:[
            {label:'热源',value:'heatSource',icon:'icon-reyuan-', isVisible: true},
            {label:'首站',value:'originStation',icon:'icon-start-copy', isVisible: false},
            {label:'换热站',value:'exchangeStation',icon:'icon-transform', isVisible: true},
            {label:'一级管网',value:'primaryPipe',icon:'icon-zhixian', isVisible: true},
            {label:'二级管网',value:'secondaryPipe',icon:'icon-xuxian', isVisible: true},
          ],
          heatSourcePoint:[],
          path:[],
        }
      },
      mounted () {
        this.initMap(); //调用地图

        this.getPiePath();
        this.getHeatSourcePoint();
        this.getexchangeStationPointData();
        this.getoriginStationPointData();
      },
      methods: {
        initMap() {
          map = new AMap.Map('container', {
            center: [116.53381,39.88339],
            resizeEnable: true,
            zoom: 13,
            lang: 'ch',
            mapStyle: "amap://styles/grey" ,//初始化地图皮肤
          })
        },

        //换肤
        setMapStyle(value){
          var styleName = "amap://styles/" + value;
          map.setMapStyle(styleName);
        },
        //请求管网path数据
        getPiePath(){
          // var that = this;
          this.$ajax.post('/map/getPipeline',{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if(res.data.status === 200) {
                     path = res.data.result.primaryPipe;
                     secondaryPipePath = res.data.result.secondaryPipe;
                     for(var type in res.data.result){
                        this.drawLines(res.data.result[type],type);
                     }
                } else {
                    this.$notify.error({title: res.data.message});
                }
            }).catch(res => {
                this.$notify.error({title: '请刷新重试'});
            })
        },
        //请求热源点数据
        getHeatSourcePoint(){
          this.$ajax.post('/map/getHeatSourcePoint',{},{
            headers:{
               'x-requested-with': 'XMLHttpRequest'
            },
          }).then(res => {
             if(res.data.status === 200) {
                markerPoints.heatSourceMarkerPoints = res.data.result;
                this.drawMarker(markerPoints.heatSourceMarkerPoints,'heatSource');
             } else {
                 this.$notify.error({title: res.data.message});
             }
          }).catch(res => {
             this.$notify.error({title: '请刷新重试'});
          })
        },

        //请求首站数据
        getoriginStationPointData(){
          this.$ajax.post('/map/getOriginStationPoint',{},{
             headers:{
               'x-requested-with': 'XMLHttpRequest'
             }}).then(res => {
               if(res.data.status === 200) {
                    var result = res.data.result;
                    markerPoints.originStationMarkerPoints = res.data.result;
               } else {
                   this.$notify.error({title: res.data.message});
               }
          }).catch(res => {
               this.$notify.error({title: '请刷新重试'});
          })
        },
        //请求换热站数据
        getexchangeStationPointData(){
          this.$ajax.post('/map/getExchangeStationPoint',{},{
             headers:{
               'x-requested-with': 'XMLHttpRequest'
             }}).then(res => {
               if(res.data.status === 200) {
                    var result = res.data.result;
                    markerPoints.exchangeStationMarkerPoints = res.data.result;
                    this.drawMarker(markerPoints.exchangeStationMarkerPoints,'exchangeStation');
               } else {
                   this.$notify.error({title: res.data.message});
               }
          }).catch(res => {
               this.$notify.error({title: '请刷新重试'});
          })
        },
        drawLines(path,type){
          // console.log(path,type)
          var lineStyle={
            path : path,
            strokeColor:'#80d8ff',
            strokeStyle: 'solid',
          }
          switch (type){
            case 'primaryPipe':{
                lineStyle.strokeStyle = 'solid';
                line = new AMap.Polyline(lineStyle);
                map.add(line);
                break;
            }
            case 'secondaryPipe':{
                lineStyle.strokeStyle = 'dashed';
                secondaryPipeLine = new AMap.Polyline(lineStyle);
                map.add(secondaryPipeLine);
                break;
            }
          }
        },
        drawMarker(markerPoints,type){
          var that = this;
          var svgStyle = {
              symbolJs: '//at.alicdn.com/t/font_1209716_mowibqmgf5.js',
              icon: 'icon-reyuan-',
              size: 25,
              offset: [-12.5, -12.5],
              fillColor: '#3399FF'
          };
          var svgPosition={
              map: map,
              position:[],
              showPositionPoint: true //控制中心点是否显示
          }

          AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
            if (!SvgMarker.supportSvg) {
               alert('当前环境不支持SVG');
            }
            for(var i in markerPoints){
              svgPosition.position = markerPoints[i];
              // svgStyle.icon = that.drawToolsData[index].icon
              switch(type){
                case 'heatSource':{
                    svgStyle.icon = 'icon-reyuan-';
                    var heatSourceMarker = new SvgMarker(new SvgMarker.Shape.IconFont(svgStyle), svgPosition);
                    heatSourceMarker.on('click', that.markerClick);
                    svgMarkerArr.heatSourceMarkerArr.push(heatSourceMarker)
                    break;
                }
                case 'originStation':{
                    svgStyle.icon = 'icon-start-copy';
                    var originStationMarker = new SvgMarker(new SvgMarker.Shape.IconFont(svgStyle),svgPosition);
                    originStationMarker.on('click', that.markerClick);
                    svgMarkerArr.originStationMarkerArr.push(originStationMarker)
                    break;
                }
                case 'exchangeStation':{
                    svgStyle.icon = 'icon-transform';
                    var exchangeStationMarker = new SvgMarker(new SvgMarker.Shape.IconFont(svgStyle),svgPosition);
                    exchangeStationMarker.on('click', that.markerClick);
                    svgMarkerArr.exchangeStationMarkerArr.push(exchangeStationMarker)
                    break;
                }
              }
            }

          });
        },
        markerClick(){
            console.log("sss");
        },
        changeLayer(type, index){
          switch (type){
            case "primaryPipe":
              map.remove(line);
              this.drawLines(!this.drawToolsData[index].isVisible?path:[],type);
              break;
            case "secondaryPipe":
              map.remove(secondaryPipeLine);
              this.drawLines(!this.drawToolsData[index].isVisible?secondaryPipePath:[],type);
              break;
            case "heatSource":
              map.remove(svgMarkerArr.heatSourceMarkerArr);
              this.drawMarker(!this.drawToolsData[index].isVisible?markerPoints.heatSourceMarkerPoints:[], type);
              break;
            case "originStation":
              map.remove(svgMarkerArr.originStationMarkerArr);
              this.drawMarker(!this.drawToolsData[index].isVisible?markerPoints.originStationMarkerPoints:[], type);
              break;
            case "exchangeStation":
              map.remove(svgMarkerArr.exchangeStationMarkerArr);
              this.drawMarker(!this.drawToolsData[index].isVisible?markerPoints.exchangeStationMarkerPoints:[], type);
              break;
          }
          this.drawToolsData[index].isVisible = !this.drawToolsData[index].isVisible;
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
