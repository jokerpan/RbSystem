<template>
    <div id="setupLog" class="layout">
        <!-- 表单-数据筛选 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>数据筛选</span>
            </div>
            <el-form :inline="true" :model="transferData"  ref="transferData" label-width="100px" class="demo-form-inline" id="searchData">
                <el-form-item label="操作人员"  prop="empId" >
                  <el-select v-model="transferData.empId" placeholder="全部">
                      <el-option
                        v-for="(opt,index) in options"
                        :key="index"
                        :label="opt.empName"
                        :value="opt.empId">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="操作类型"  prop="recordType" >
                  <el-select v-model="transferData.recordType" placeholder="全部">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="部门管理" value="部门管理"></el-option>
                      <el-option label="员工管理" value="员工管理"></el-option>
                      <el-option label="角色管理" value="角色管理"></el-option>
                      <el-option label="数据权限管理" value="数据权限管理"></el-option>
                      <el-option label="角色分配" value="角色分配"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="时间范围"  prop="date" >
                      <el-date-picker
                        v-model="transferData.date"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']">
                      </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="search()"><i class="iconfont icon-sousuo"></i> 查询</el-button>
                  <el-button size="small" @click="resetForm('transferData')"><i class="iconfont icon-zhongzhi"></i>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 数据列表---table -->
        <el-card class="box-card topGutter">
           <div slot="header" class="clearfix">
             <span>数据列表</span>
           </div>
           <el-table
             :data="tableData"
             stripe
             border
             :default-sort = "{prop: 'recordDate', order: 'descending'}"
             style="width: 100%">
             <el-table-column
               prop="recordDate"
               label="记录时间"
               >
             </el-table-column>

             <el-table-column
               prop="recordType"
               label="操作类型"
               >
             </el-table-column>

             <el-table-column
               prop="empName"
               label="操作人员"
               >
             </el-table-column>

             <el-table-column
               prop="empNo"
               label="员工工号"
               >
             </el-table-column>

             <el-table-column
               prop="recordIp"
               label="IP地址"
               >
             </el-table-column>

             <el-table-column
               prop="recordContent"
               label="内容"
               width="350"
               >
             </el-table-column>

           </el-table>
           <pagination
              v-bind:message="transferData"
              v-bind:urls="this.urls.getSetupLogUrl"
              @paginationMessage="getPaginationMessage"
           />
        </el-card>

    </div>
</template>

<script>
import pagination from '../../generalComponents/generalPagination.vue';
import qs from 'qs'
export default {
  components:{pagination},  //组件化
  data() {
      return {
        urls:{
          getSetupLogUrl:'/api/SysSetRecordController/getSetRecordList',
          getRoleOptsUrl:'/api/SysSetRecordController/getSysSetRecordNameList',
        },
        tableData: [],
        options:[],
        // 传输给后台的值
        transferData:{
          empId:null,
          date:[],
          recordType:null,
          beginTime:'',
          endTime:'',
          curr:1,
          size:5,
          total:null,
        },
      };
  },
  created () {
      this.getTableData();
      this.getOptions();
  },

  methods: {
        //获取表单数据
        getTableData(){
           this.transferData.total = null;
           this.$ajax.post(this.urls.getSetupLogUrl,qs.stringify(this.transferData),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if(res.data.status === 200) {
                    res.data.content.list.map(function(item,index){
                         item.recordDate = new Date(item.recordDate).toLocaleDateString().replace(/\//g,'-');
                    });
                    this.tableData = res.data.content.list;
                    this.transferData.size = res.data.content.pageSize;
                    this.transferData.total = res.data.content.pageTotal;
                    this.transferData.curr = res.data.content.currentPage;
                    // console.log(this.transferData);
                    // this.$set(this.transferData.curr, res.data.content.currentPage)
                    //页码子组件不更新---暂定解决--this.$set()
                } else {
                    this.$notify.error({title: res.data.message});
                }
            }).catch(res => {
                this.loading = false;
                this.$notify.error({title: '请刷新重试'});
            })
        },
        //搜索，提交表单数据
        search() {
            console.log(this.transferData)
            if(this.transferData.empId==null&&this.transferData.recordType==null&&this.transferData.date.length<=0){
               this.$message({
                 message: '请输入查询条件！',
                 type: 'warning'
               });
            }else{
              if(this.transferData.date.length>0){
                  this.transferData.endTime = this.transferData.date[1];
                  this.transferData.beginTime = this.transferData.date[0];
              }
              this.transferData.curr=1;
              this.transferData.size=5;
              this.getTableData();
            }
        },

        //接收子组件分页的数据--刷新整个表格
        getPaginationMessage(message){
            // console.log(message);
            this.transferData = message;
            console.log(this.transferData)
            this.getTableData();
        },

        getOptions(){
           //获取操作人员下拉数据
          this.$ajax.post(this.urls.getRoleOptsUrl,{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                   this.options = res.data.content;
                   this.options.unshift({"empId":null,"empName":"全部"})
              } else {
                  this.$notify.error({title: res.data.message});
              }
          }).catch(res => {
              this.loading = false;
              this.$notify.error({title: '请刷新重试'});
          })
//           this.$ajax.post(this.urls.getSetupLogUrl,qs.stringify(this.resetData)).then(res => {
//              if (res.data.status === 200) {
//                  this.$notify.success({
//                      title: res.data.message
//                  });
//                  //组织成想要的opt数组
//                  var midOpts=[];
//                  for(var i=0;i<res.data.content.list.length;i++){
//                     midOpts.push({"empId":res.data.content.list[i].empId,"empName":res.data.content.list[i].empName})
//                  }
//                 // console.log(midOpts);
//                 let hash = {}; 
//                 this.options = midOpts.reduce((preVal, curVal) => {
//                     hash[curVal.empId] ? '' : hash[curVal.empId] = true && preVal.push(curVal); 
//                     return preVal 
//                 }, [])
//
//                 // console.log(this.options);
//              } else {
//                  this.$notify.error({
//                      title: res.data.message
//                  });
//              }
//           }).catch(res => {
//                this.$message.error('请刷新重试');
//           })
        },

        resetForm(ruleForm) {
           this.$refs[ruleForm].resetFields();
           this.transferData.empId='';
           this.transferData.curr=1;
           this.transferData.size=5;
           this.transferData.beginTime=null;
           this.transferData.endTime=null;
           this.getTableData();
        },


  }
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
   /* by jxw */
   #setupLog .el-range-separator{
     padding:2px 0px;
   }

   .formline{
      width: 45%;
   }
   @media screen and (max-width: 1620px) {
     .formline {
       width: 95%;
     }
   }

</style>
