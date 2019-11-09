<template>
    <div class="g-all">
        <left-bar></left-bar>
        <div class="g-mn">
            <top-bar></top-bar>
            <div class="g-container" :style="{minHeight: minHeight}">
                <router-view></router-view>
            </div>
            <div class="g-ft">
                COPYRIGHT 1998-2018 版权所有 北京东方龙马软件发展有限公司 京ICP备14000200号-1
            </div>
        </div>
    </div>
</template>

<script>
    import topBar from './topBar'
    import leftBar from './leftBar'
    import {typeOf} from '../utils/utils'



    export default {
        name: 'container',
        components: {
            topBar,
            leftBar
        },
        data() {
            return {
                minHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 60 + 'px'
            }
        },
        beforeCreate() {
          if (typeOf(this.$cookie.get('user')) === "undefined") {
            window.location.href = './user';
          }
        }
    }
</script>

<style lang="less">
  @import "../less/index.less";
  @import "../icon/iconfont.css";
  .g-all {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  .g-mn {
    margin-left: 250px;
    position: relative;
  .g-container {
    background: #f0f2f5;
    padding: 30px 30px 88px;
  }
  .g-ft {
    width: 100%;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 24px;
  }
  }
  }
  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: none;
  th {
    background: #fafafa;
  }
  }
</style>
