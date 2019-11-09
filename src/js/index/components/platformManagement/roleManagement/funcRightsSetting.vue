<template>
  <div class="layout" id="funcSetting">
    <div class="roleSetting">
        <div>
            <p  class="roleHeader" style="background-color: #FFFFFF;">角色权限设置</p>
            <span  class="roleHeader">角色名称：{{this.$route.query.name}}</span>
        </div>
        <el-card class="box-card" >
            <div class="roleSetting-table">
              <div class="select-body" v-for="(partition,partitionIndex) in funcSettingData" :key="partitionIndex">
                  <!-- 二级块循序 -->
                  <div class="selectGroup">
                     <el-checkbox
                     :indeterminate="partition.indeterminate"
                      v-model="partition.type?vtrue:vfalse"
                      @change="handleCheckedCountryAllChange(partitionIndex,partition.functionId,$event)"
                      :label="partition.functionName"
                      :key="partitionIndex"></el-checkbox>
                  </div>
                  <!-- 每个复选框 -->
                  <div class="selectitems">
                      <el-checkbox
                      v-for="country in partition.childsList"
                      v-model="country.type?vtrue:vfalse"
                      @change="handleCheckedCountryChange(partitionIndex,country.functionId,partition.functionId,$event)"
                      :label="country.functionName"
                      :key="country.functionId">{{country.functionName}}</el-checkbox>
                  </div>
              </div>

              <div class="allcheck">
                  <el-checkbox :indeterminate="indeterminate" v-model="ischeckAll" @change="handleCheckAllChange">全选</el-checkbox>
              </div>

              <div class="btns">
                  <el-button type="primary" @click="saveRoleSetting">保存</el-button>
                  <el-button type="primary" @click="rest" plain>重置</el-button>
              </div>
            </div>
        </el-card>
    </div>
  </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name:'roleSetting',
        components: {
        },
        props:{
        },
        data() {
            return {
                urls:{
                   getfuncRightUrl:'/api/SysRoleController/getSysRoleFunctionList',
                   submitfuncRightUrl:'/api/SysRoleController/insertSysRoleFunction',
                },
                vtrue:true,
                vfalse:false,
                funcSettingData:[],
                ischeckAll:false,//一级全选状态
                indeterminate:false,
                roleId:this.$route.query.id,

            }
        },
        created () {
            this.getfuncRightData();
        },

        methods: {
            getfuncRightData(){
                this.$ajax.post(this.urls.getfuncRightUrl,qs.stringify({"roleId":this.roleId}),{
                  headers:{
                    'x-requested-with': 'XMLHttpRequest'
                  }}).then(res => {
                    if(res.data.status === 200) {
                        this.funcSettingData = res.data.content;
                    } else {
                        this.$notify.error({title: res.data.message});
                    }
                }).catch(res => {
                    this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
                })
            },
            //全选事件
            handleCheckAllChange(e){//一级change事件
                this.ischeckAll = e
                if(e == true){
                    this.indeterminate = false
                    for(var i=0,len=this.funcSettingData.length; i<len; i++){ //二级全选反选不确定
                        this.funcSettingData[i].type = e
                        for(var j=0,len1=this.funcSettingData[i].childsList.length; j<len1; j++){
                            this.funcSettingData[i].childsList[j].type = e
                        }
                    }
                }else{
                    this.indeterminate = false
                    for(var i=0,len=this.funcSettingData.length; i<len; i++){ //三级全选反选不确定
                        this.funcSettingData[i].type = e
                        for(var j=0,len1=this.funcSettingData[i].childsList.length; j<len1; j++){
                            this.funcSettingData[i].childsList[j].type = e
                        }
                    }
                }
            },
            //每部分的全选事件
            handleCheckedCountryAllChange(index, topId, e){//二级change事件
                this.funcSettingData[index].type = e//二级勾选后，子级全部勾选或者取消
                if(e == false) this.funcSettingData[index].indeterminate = false //去掉二级不确定状态
                var childrenArray = this.funcSettingData[index].childsList
                if(childrenArray)
                    for(var i=0,len=childrenArray.length; i<len; i++)
                        childrenArray[i].type = e

                this.getIsCheckAll()
            },
            //每个单独的全选事件
            handleCheckedCountryChange(topIndex, sonId, topId, e){//三级change事件
                var childrenArray = this.funcSettingData[topIndex].childsList
                var tickCount = 0, unTickCount = 0, len = childrenArray.length
                for(var i = 0; i < len; i++){
                    if(sonId == childrenArray[i].functionId) childrenArray[i].type = e
                    if(childrenArray[i].type == true) tickCount++
                    if(childrenArray[i].type == false) unTickCount++
                }
                if(tickCount == len) {//三级级全勾选
                    this.funcSettingData[topIndex].type = true
                    this.funcSettingData[topIndex].indeterminate = false
                } else if(unTickCount == len) {//三级级全不勾选
                    this.funcSettingData[topIndex].type = false
                    this.funcSettingData[topIndex].indeterminate = false
                } else {
                    this.funcSettingData[topIndex].type = false
                    this.funcSettingData[topIndex].indeterminate = true //添加二级不确定状态
                }
                this.getIsCheckAll()
            },
            getIsCheckAll(){
                var tickCount = 0, unTickCount = 0, ArrLength = this.funcSettingData.length
                for(var j=0; j<ArrLength; j++){//全选checkbox状态
                    if(this.funcSettingData[j].type == true) tickCount++
                    if(this.funcSettingData[j].type == false) unTickCount++
                }
                if(tickCount == ArrLength) {//二级全勾选
                    this.ischeckAll = true
                    this.indeterminate = false
                } else if(unTickCount == ArrLength) {//二级全不勾选
                    this.ischeckAll = false
                    this.indeterminate = false
                } else {
                    this.ischeckAll = false
                    this.indeterminate = true //添加一级不确定状态
                }
            },
            saveRoleSetting(){
               var  funtionIds='';
               for(var i=0;i<this.funcSettingData.length;i++){
                  if(this.funcSettingData[i].type==true){
                      funtionIds += this.funcSettingData[i].functionId+';';
                  }
                  for(var j=0;j<this.funcSettingData[i].childsList.length;j++){
                      if(this.funcSettingData[i].childsList[j].type==true){
                          funtionIds += this.funcSettingData[i].childsList[j].functionId+';';
                      }
                  }
               }
               // console.log(funtionIds);
               this.$ajax.post(this.urls.submitfuncRightUrl,qs.stringify({"roleId":this.roleId,"funtionIds":funtionIds}),{
                  headers:{
                    'x-requested-with': 'XMLHttpRequest'
                  }}).then(res => {
                   if(res.data.status === 200) {
                       // console.log(res.data.content)
                       // this.funcSettingData = res.data.content;
                       // this.getfuncRightData();
                       this.$router.push({
                          path:"/platformManagement/roleManagement",
                       });
                   } else {
                       this.$notify.error({title: res.data.message});
                   }
               }).catch(res => {
                   this.loading = false;
                   this.$notify.error({title: '请刷新重试'});
               })
            },
            reset(){
              this.getfuncRightData();
            },
        },

    }
</script>
<style>
  @import "../../../../../less/layout.css";

    .select-body{
        border: 1px solid #ddd;
        margin-top: 20px;
        height: 90px;
    }
    .selectGroup{
        height: 45px;
        background-color: #F9FAFC;
        padding:14px;
        border-bottom: 1px solid #ddd;
    }
    .selectitems{
        padding:14px;
        height: 45px;
    }
    .allcheck{
        border: 1px solid #ddd;
        margin-top: 20px;
        height: 45px;
        background-color: #F9FAFC;
        text-align: center;
        padding: 14px;
    }
    .btns{
        text-align: center;
        margin-top: 50px;
    }
    .btns button{
        padding: 10px  60px;

    }
    .roleHeader{
       background-color: #F3F3F3;
       height: 50px;
       line-height: 50px;
       padding-left: 10px;
    }
    .roleSetting{
       box-shadow:0 0 5px #b9b1b1;
    }

</style>
