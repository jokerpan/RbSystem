<template>
    <el-submenu v-if="childrenList.length > 0" :index="parentItem.functionUrl" :key="index">
        <template slot="title">
            <i :class="['iconfont', parentItem.functionIcon]"></i>
            <span>{{parentItem.functionName}}</span>
        </template>
        <el-menu-item v-for="val in childrenList" :index="val.functionUrl" :key="val.functionId" @click="selectItem(val)">
            <template slot="title">
                <span>{{val.functionName}}</span>
            </template>
        </el-menu-item>
    </el-submenu>
    <el-menu-item :index="parentItem.functionUrl" v-else @click="selectItem(parentItem)">
        <i :class="['iconfont', parentItem.functionIcon]"></i>
        <span slot="title">{{parentItem.functionName}}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name: 'menu-list',
        props: ["parentItem", "childrenList", "index"],
        methods: {
            selectItem(functionObj){
                this.$emit('transPageTitle',functionObj);
            }
        }
    }
</script>
<style>
    .el-menu-item{
        font-size: 16px;
    }
    .el-submenu__title{
        font-size: 16px;
    }
    .el-submenu .el-menu-item{
        padding-left: 54px!important;
    }
</style>