<template>
    <div class="g-lf">
        <div class="m-logo">
            <img src="" />
        </div>
        <el-menu :default-active="$route.path" router background-color="#42495B" text-color="#B9BDC9" active-text-color="#fff">
             <el-submenu index="/list">
                <template slot="title">
                    <i class="iconfont icon-icon-test8"></i>
                    <span>您当前为：审核负责人</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/list/homePage">
                        <i class="iconfont icon-icon-test8"></i>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="/list/auditManage">
                        <i class="iconfont icon-icon-test8"></i>
                        <span>审核人员管理</span>
                    </el-menu-item>
                    <el-menu-item index="/list/reimbursementRecord">
                        <i class="iconfont icon-icon-test8"></i>
                        <span>报销申请记录</span>
                    </el-menu-item>
                     <el-menu-item index="/list/reApplyList">
                        <i class="iconfont icon-icon-test8"></i>
                        <span>重新审核申请列表</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'leftBar'
    }
</script>

<style lang="less">
    .g-lf {
        width: 250px;
        height: 100%;
        background: #42495B;
        overflow-y: scroll;
        position: fixed;
        top: 0;
        left: 0;
        .m-logo {
            text-align: center;
            cursor: pointer;
            padding: 20px 0;
            img {
                width: 102px;
                vertical-align: middle;
            }
        }
        .el-menu {
            border: none;
        }
        .iconfont {
            width: 24px;
            font-size: 18px;
            text-align: center;
            vertical-align: middle;
            margin-right: 5px;
        }
    }
</style>
