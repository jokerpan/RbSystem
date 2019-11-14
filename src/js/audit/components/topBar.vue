<template>
    <div class="g-top">
        <div class="pull-right">
            <div class="t-msg">
                <el-badge :value="12">
                    <i class="el-icon-bell"></i>
                </el-badge>
            </div>
            <el-dropdown>
                <div class="t-usr">
                    <img src=""/>欢迎
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>
                        <div class="m-drop-cell">
                            <i class="el-icon-setting"></i> 设置
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <div class="m-drop-cell" @click="handleExit">
                            <i class="el-icon-delete"></i> 退出
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topBar',
        methods: {
            handleExit() {
                window.location.href = './user';
            }
        }
    }
</script>

<style lang="less">
  .g-top {
    width: 100%;
    height: 60px;
    color: rgba(0, 0, 0, .65);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    padding: 0 25px;
  .pull-right {
    cursor: pointer;
    float: right;
    display: flex;
    align-items: center;
  .t-msg {
    line-height: 24px;
    font-size: 24px;
    margin: 18px 30px;
    display: inline-block;
  }
  .t-usr {
    height: 24px;
    line-height: 24px;
    cursor: pointer;
  img {
    width: 24px;
    vertical-align: middle;
    margin-right: 8px;
  }
  }
  }
  }
  .m-drop-cell {
    font-size: 16px;
    padding: 0 10px;
  i {
    margin-right: 10px;
  }
  }
</style>
