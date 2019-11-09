<template>
    <div id="roleAssign" class="layout">
        <!-- 表单-数据筛选 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>数据筛选</span>
            </div>
            <el-form :inline="true" :model="transferData"  ref="transferData" label-width="100px" class="demo-ruleForm" >
              <el-form-item label="输入查询" prop="roleName">
                <el-input v-model="transferData.roleName" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="search('transferData')"><i class="iconfont icon-sousuo"></i> 查询</el-button>
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
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%">
             <el-table-column
               label="序号"
               type="index"
               :index="indexMethod"
               width="50"
             >
             </el-table-column>
             <el-table-column
               prop="roleName"
               label="角色名称"
               >
             </el-table-column>
             <el-table-column
               prop="roleNote"
               label="角色描述"
               >
             </el-table-column>
             <el-table-column
               prop="num"
               label="角色人员"
               >
               <template slot-scope="scope">
                  <el-link type="primary"  @click="showEmployeesView(scope.$index, scope.row)">{{scope.row.num}}</el-link>
               </template>
             </el-table-column>
             <el-table-column label="操作" width="400">
               <template slot-scope="scope">
                  <el-link style="margin-left: 5px; color: #409EFF;"  :underline="false" @click="addPerson(scope.$index, scope.row)">
                      <i class="iconfont icon-tianjia"></i> 添加人员
                  </el-link>
               </template>
             </el-table-column>
           </el-table>
           <pagination
              v-bind:message="transferData"
              v-bind:urls="this.urls.getRoleListUrl"
              @paginationMessage="getPaginationMessage"
           />
        </el-card>

        <!-- 查看部门人员 dialog-->
        <el-dialog id="showEmployees" title="部门人员" :visible.sync="employeesViewDialogVisible"  >
             <el-table
              :data="showEmployeesData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="empNo"
                label="员工工号"
                >
              </el-table-column>
              <el-table-column
                prop="empName"
                label="姓名"
                >
              </el-table-column>
              <el-table-column
                prop="empPhone"
                label="手机号码">
              </el-table-column>
              <el-table-column
                prop="empNote"
                label="备注">
              </el-table-column>
            </el-table>
            <pagination
               v-bind:message="empNumTransferData"
               v-bind:urls="this.urls.showEmployeesViewDataUrl"
               @paginationMessage="getShowRolePaginationMessage"
            />
        </el-dialog>

        <!-- 添加人员 dialog-->
        <el-dialog id="addPerson" title="添加人员" :visible.sync="addPersonDialogVisible"  >
            <div style="width: 90%; margin: 0 auto;">
                <p style="margin-bottom: 15px;">角色名称: {{this.dialogRoleName}}</p>
                <template>
                  <el-transfer
                      v-model="addPersons"
                      :data="prosonData"
                      filterable
                      :titles="['选择员工', '已选']"
                      >
                  </el-transfer>
                </template>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addOrUpdateDialogSubmit()">确 定</el-button>
                  <el-button  @click="addPersonDialogVisible = false">取 消</el-button>
                </div>
                <div style="clear: both;"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import pagination from '../../generalComponents/generalPagination.vue';
import qs from 'qs'
export default {
  components:{pagination},  //组件化
  data() {
      return {
        genUrl:'',//存放公共路径
        componentUrl:'/platformManagement/getRoleformList',
        urls:{
           getRoleListUrl:'/api/SysRoleController/getSysRoleList',
           selectFormUrl:'/api/SysRoleController/getSysRoleList',
           showEmployeesViewDataUrl:'/api/SysEmpController/getSysRoleListIsChoice',
           addDepartmentUrl:'/api/SysEmpController/getSysEmpListRoleChose',//获取人员-穿梭框
           submitAddPersonForSystemUrl:'/api/SysEmpController/insertSysEmpRole',
        },
        //传输给后台的值
        transferData:{
          roleName:null,
          roleState:null,
          curr:1,
          size:5,
          total:null,
        },
        //查看角色人员时想后台传输的分页数据
        empNumTransferData:{
          roleId:'',
          curr:1,
          size:5,
          total:null,
        },
        employeesViewDialogVisible:false,
        addPersonDialogVisible:false,
        tableData: [],
        prosonData:[],
        addPersons: [],
        showEmployeesData:[],
        selectForm: {
          name:'',
        },
        paginationValue:{
          pageSize:10,
          totalItems:0,
          currentPage:1,
        },
        showRolePaginationValue:{
          pageSize:10,
          totalItems:0,
          currentPage:1,
        },
        dialogRoleName:'',
        dialogRoleId:'',
      };
  },
  created () {
      this.getTableData();
  },
  methods: {
        //获取表单数据
        getTableData(){
           this.transferData.total = null;
           this.$ajax.post(this.urls.getRoleListUrl,qs.stringify(this.transferData),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if(res.data.status === 200) {
                    var that=this;
                    res.data.content.list.map(function(item,index){
                         item.roleDate = new Date(item.roleDate).toLocaleDateString().replace(/\//g,'-');
                    });
                    this.tableData = res.data.content.list;
                    this.transferData.size = res.data.content.pageSize;
                    this.transferData.total = res.data.content.pageTotal;
                    this.transferData.curr = res.data.content.currentPage;
                } else {
                    this.$notify.error({title: res.data.message});
                }
            }).catch(res => {
                this.loading = false;
                this.$notify.error({title: '请刷新重试'});
            })
        },
        //获取添加人员的穿梭框数据
        getAddPersonData(row){
          var functionId = document.getElementById('functionId').innerText;
          this.$ajax.post(this.urls.addDepartmentUrl,qs.stringify({"roleId":row.roleId,"functionId":functionId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
               if(res.data.status === 200) {
                  res.data.content.allEmp.map(function(item,index){
                      item["key"]=item.empId;
                      item["label"]=item.empId+" "+item.empName;
                  })
                  var selectedIds = [];
                  res.data.content.empState.map(function(item,index){
                      selectedIds.push(item.empId);
                  })
                  this.addPersons = selectedIds;
                  this.prosonData = res.data.content.allEmp;
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
          if(this.transferData.roleName==null){
             this.$message({
               message: '请输入查询条件！',
               type: 'warning'
             });
          }else{
             this.transferData.curr=1;
             this.transferData.size=5;
             this.getTableData();
          }
        },
        //表格序号
        indexMethod(index) {
          index = index+1;
          if(this.transferData.curr==1){
              return index;
          }else{
              return index+(this.transferData.curr-1)*(this.transferData.size);
          }
        },
         //接收子组件分页的数据--刷新整个表格
        getPaginationMessage(message){
            // this.tableData = message;
            this.transferData = message;
            this.getTableData();
        },
       //接收子组件分页的数据--刷新角色
        getShowRolePaginationMessage(message){
            // console.log(message)
            this.empNumTransferData = message;
            this.showEmployeesView();
        },
      //----------------以上是通用函数-------------------

      // 添加人员
      addPerson(index,row) {
        this.getAddPersonData(row);
        this.dialogRoleName = row.roleName;
        this.dialogRoleId = row.roleId;
        this.addPersonDialogVisible = true;
      },

      //添加人员提交
      addOrUpdateDialogSubmit(){
         var empIds='';
         this.addPersons.map(function(id){
            empIds += id+';';
         })
         var functionId = document.getElementById('functionId').innerText;
         this.$ajax.post(this.urls.submitAddPersonForSystemUrl,qs.stringify({"roleId":this.dialogRoleId,"empIds":empIds,"functionId":functionId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                  this.addPersonDialogVisible = false;
                  this.$notify.success({
                      title: res.data.message
                  });
                  this.getTableData();
              } else {
                  this.$notify.error({title: res.data.message});
              }
          }).catch(res => {
              this.loading = false;
              this.$notify.error({title: '请刷新重试'});
          })

      },

      //查看
      showEmployeesView(index,row){
          if(row){
            this.empNumTransferData.roleId = row.roleId;
          }
          this.empNumTransferData.total = null;
          this.empNumTransferData.curr = 1;
          this.empNumTransferData.size = 5;
          this.employeesViewDialogVisible = true;
          this.$ajax.post(this.urls.showEmployeesViewDataUrl,qs.stringify(this.empNumTransferData),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if(res.data.status === 200) {
                   this.showEmployeesData = res.data.content.list;
                    this.empNumTransferData.size = res.data.content.pageSize;
                    this.empNumTransferData.total = res.data.content.pageTotal;
                    this.empNumTransferData.curr = res.data.content.currentPage;
                } else {
                    this.$notify.error({title: res.data.message});
                }
            }).catch(res => {
                this.loading = false;
                this.$notify.error({title: '请刷新重试'});
            })
      },
      resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.transferData.curr=1;
        this.transferData.size=5;
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


  /* 添加人员弹框 */
  #addPerson .el-dialog{
     width: 670px;
  }
  #addPerson .el-transfer-panel{
     width: 250px;
  }
  #addPerson .el-transfer__buttons{
     padding:0 15px;
  }
  #addPerson .dialog-footer{
     float: right;
     margin: 25px 0px 0px 0px;
  }
  .el-transfer-panel__item{
     display: block;
  }
  /* 查看人员 */
  #showEmployees .el-dialog{
     width: 800px;
  	  min-height: 430px;
  }

</style>
