<template>
  <div class="layout" id="dataRightSetting">
    <el-card>
        <div slot="header" class="clearfix">
          <span>数据权限设置</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="页面名称"
            prop="functionName">
          </el-table-column>
          <el-table-column
            label="总公司员工"
            prop="authorityStaff1">
          </el-table-column>
          <el-table-column
            label="分公司员工"
            prop="authorityStaff2"
          >
            <template slot-scope="scope">
                <el-select v-model="scope.row.authorityStaff2" placeholder="请选择" @change="authorityStaff2Change(scope.$index, scope.row)">
                  <el-option
                    v-for="item in branchCompanyOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="班组员工"
            prop="authorityStaff3"
          >
            <template slot-scope="scope">
                <el-select v-model="scope.row.authorityStaff3" placeholder="请选择" @change="authorityStaff3Change(scope.$index, scope.row)">
                  <el-option
                    v-for="item in classCompanyOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 385px;margin: 40px auto;">
          <el-button style="padding:12px 75px;"  type="primary" @click="submitForm()">提交</el-button>
          <el-button  style="padding:12px 75px;"   type="primary" plain  @click="resetForm()">重置</el-button>
        </div>
    </el-card>
  </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name:'dataRightSetting',
        data() {
          return {
            urls:{
               getDataRightsUrl:'/api/SysDataAuthorityController/getSysDataAuthorityList',
               submitDataRightsUrl:'/api/SysDataAuthorityController/updateSysDataAuthority',
            },
            tableData:[],
            copyTableData:[],
            branchCompanyOpts:[
              {
                value: 1,
                label: '总公司数据权限',
              },
              {
                value: 2,
                label: '分公司数据权限',
              },
            ],
            classCompanyOpts:[
              {
                value: 1,
                label: '总公司数据权限',
              },
              {
                value: 2,
                label: '分公司数据权限',
              },
              {
                value: 3,
                label: '班组数据权限',
              },
            ],
          }
        },
        computed: {
        },
        created() {
           this.getTableData();
        },
        updated(){

        },
        methods: {
          //获取表单数据
          getTableData(){
             this.$ajax.post(this.urls.getDataRightsUrl,{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                  if(res.data.status === 200) {
                      for(var i=0;i<res.data.content.length;i++){
                         if(res.data.content[i].authorityStaff1 == 1){
                            res.data.content[i].authorityStaff1 = "总公司数据权限";
                         }
                      }
                      this.tableData = res.data.content
                  } else {
                      this.$notify.error({title: res.data.message});
                  }
              }).catch(res => {
                  this.loading = false;
                  this.$notify.error({title: '请刷新重试'});
              })
          },
          authorityStaff2Change(index,row){
             this.tableData[index].authorityStaff2=row.authorityStaff2;
          },
          authorityStaff3Change(index,row){
             this.tableData[index].authorityStaff3=row.authorityStaff3;
          },
          submitForm(){
              for(var i=0;i<this.tableData.length;i++){
                 if(this.tableData[i].authorityStaff1 == "总公司数据权限"){
                    this.tableData[i].authorityStaff1 = 1;
                 }
              }
              this.$ajax.post(this.urls.submitDataRightsUrl,this.tableData,{
                headers:{
                  'x-requested-with': 'XMLHttpRequest'
               }}).then(res => {
                    if(res.data.status === 200) {
                        this.getTableData();
                    } else {
                        this.$notify.error({title: res.data.message});
                    }
               }).catch(res => {
                    this.loading = false;
                    this.$notify.error({title: '请刷新重试'});
               })
          },
          resetForm(){
             this.getTableData();
          },
        },


    }
</script>
<style>
  @import "../../../../../less/layout.css";
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  #dataRightSetting .el-select{
    display: block;
  }

</style>
