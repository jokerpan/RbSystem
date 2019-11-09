<template>
    <div id="empManagement" class="layout">
        <!-- 表单-数据筛选 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>数据筛选</span>
            </div>
            <el-form :inline="true" :model="transferData"  ref="transferData" label-width="100px" class="demo-ruleForm" id="searchData">
              <el-form-item label="输入查询" prop="empNoName">
                <el-input v-model="transferData.empNoName" placeholder="工号/姓名"></el-input>
              </el-form-item>
              <el-form-item label="员工角色" prop="roleId">
                <el-select v-model="transferData.roleId" placeholder="全部">
                  <el-option
                    v-for="(opt,index) in roleOpts"
                    :key="index"
                    :label="opt.roleName"
                    :value="opt.roleId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属部门" prop="departId">
                 <el-cascader
                    ref="depCascader"
                    placeholder="所有部门"
                    v-model="transferData.departId"
                    :options="departOpts"
                    :show-all-levels="false"
                    :props="{ checkStrictly: true }"
                    clearable>
                 </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="search()"><i class="iconfont icon-sousuo"></i> 查询</el-button>
                <el-button size="small"  @click="resetForm('transferData')"><i class="iconfont icon-zhongzhi"></i>重置</el-button>
              </el-form-item>
            </el-form>
        </el-card>
        <!-- 数据列表---table -->
        <el-card class="box-card topGutter">
           <div slot="header" class="clearfix">
             <span>数据列表</span>
                <el-button size="small" style="float: right;"  id="addButton"  @click="showAddModal()" type="primary"><i class="iconfont icon-tianjia"></i>&nbsp;添加</el-button>
                <el-button size="small" style="float: right;margin-right: 10px;" @click="batchImport()">
                    <i class="iconfont icon-xiazai"></i>&nbsp;导入
                </el-button>
           </div>
           <el-table
             :data="tableData"
             stripe
             border
             v-loading="loading"
             :default-sort = "{prop: 'id', order: 'descending'}"
             style="width: 100%">
             <el-table-column
               label="序号"
               type="index"
               :index="indexMethod"
               width="50"
             >
             </el-table-column>
             <el-table-column
               prop="empNo"
               label="工号"
               >
             </el-table-column>
             <el-table-column
               prop="empName"
               label="员工姓名">
             </el-table-column>
             <el-table-column
               prop="empSex"
               label="性别"
               width="80"
               >
             </el-table-column>
             <el-table-column
               prop="departName"
               label="所属部门">
             </el-table-column>
             <el-table-column
               prop="roleName"
               label="员工角色">
             </el-table-column>
             <el-table-column
               prop="empPhone"
               label="手机">
             </el-table-column>
             <el-table-column label="操作" width="300">
               <template slot-scope="scope">
                  <el-link style="margin-left: 5px; color: #409EFF;"  :underline="false" @click="showUpdateModal(scope.$index, scope.row)">
                      <i class="iconfont icon-bianji"></i> 编辑
                  </el-link>
                  <el-link v-if="scope.row.empState!=2" style="margin-left: 10px; color: #409EFF;" :underline="false" @click="isFrozenChanged(scope.$index, scope.row)">
                      <i class="iconfont icon-tabledisable"></i> {{scope.row.empState==1?"冻结":"取消冻结"}}
                  </el-link>
               </template>
             </el-table-column>
           </el-table>
           <pagination
              v-bind:message="transferData"
              v-bind:urls="this.urls.getEmpTableDataUrl"
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
        props: { multiple: true },
        depCascader:[],
        urls:{
          getEmpTableDataUrl:'/api/SysEmpController/getSysEmpList', //获取员工信息-table
          getRoleOptsUrl:'/api/SysRoleController/getSysRoleSelect',//获取角色下拉
          getDepartOptsUrl:'/api/SysDepartController/getSysDepartAll',//获取所属部门下拉
          isFrozenUrl:'/api/SysEmpController/getSysEmpState',//查询接口 后台未给
        },
        importTipvisible: false,
        tableData: [],
        roleOpts:[],
        departOpts:[],
        loading: false,
        //传输给后台的值
        transferData:{
          roleId:null,
          departId:null,
          empNoName:null,
          curr:1,
          size:5,
          total:null,
        },
        paginationValue:{
          pageSize:10,
          totalItems:0,
          currentPage:1,
        },
        selectForm: {
          query: '',
          employeesRole: '',
          department: '',
        },
      };
  },
  created () {
       this.getTableData();
       this.getRoleOpts();
       this.getDepartOpts();
  },
  methods: {
      getTableData(){
          //获取列表数据
          this.transferData.total = null;
          this.$ajax.post(this.urls.getEmpTableDataUrl,qs.stringify(this.transferData),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                  this.$notify.success({
                      title: res.data.message
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
      //获取角色下拉数据
      getRoleOpts(){
          this.$ajax.post(this.urls.getRoleOptsUrl,{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                   // console.log(res.data.content);
                   this.roleOpts = res.data.content;
                   this.roleOpts.unshift({"roleId":null,"roleName":"全部"})
              } else {
                  this.$notify.error({title: res.data.message});
              }
          }).catch(res => {
              this.loading = false;
              this.$notify.error({title: '请刷新重试'});
          })
      },
      //获取部门下拉数据
      getDepartOpts(){
          this.$ajax.post(this.urls.getDepartOptsUrl,{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                   this.departOpts = JSON.parse(JSON.stringify(res.data.content).replace(/childList/g, 'children'));
                   this.departOpts = JSON.parse(JSON.stringify(this.departOpts).replace(/departName/g, 'label'));
                   this.departOpts = JSON.parse(JSON.stringify(this.departOpts).replace(/departId/g, 'value'));
                   // this.departOpts = res.data.content;
                   // console.log(this.departOpts);
              } else {
                  this.$notify.error({title: res.data.message});
              }
          }).catch(res => {
              this.loading = false;
              this.$notify.error({title: '请刷新重试'});
          })
      },

      //批量导入跳转
      batchImport(){
          this.$router.push("/platformManagement/batchImport");
      },
      //添加员工
      showAddModal(){
        this.$router.push({
           path:"/platformManagement/addorEditEmployees",
        });

      },
      //编辑员工
      showUpdateModal(index, row) {
        this.$router.push({
           path:"/platformManagement/addorEditEmployees",
           query:{
            type:'edit',
            empId:row.empId,
            // ...row
           }
        });

      },

      //冻结员工账号
      isFrozenChanged(index, row) {
        var isFrozen={
            "empState":1^row.empState,
            'empId':row.empId,
        }
        this.$alert('是否要冻结该员工账号', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$ajax.post(this.urls.isFrozenUrl,qs.stringify(isFrozen),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if (res.data.status === 200) {
                    this.$notify.success({
                        title: res.data.message
                    });
                    this.getTableData();
                } else {
                    this.$notify.error({
                        title: res.data.message
                    });
                }
            }).catch(res => {
                this.$message.error('请刷新重试');
            })
          }
        });
      },
      //搜索，提交表单数据
      search() {
         // console.log(this.$refs.depCascader.getCheckedNodes());
         //判断是否有筛选值
         if(this.transferData.roleId==null&&this.transferData.departId==null&&this.transferData.empNoName==null){
            this.$message({
              message: '请输入查询条件！',
              type: 'warning'
            });
         }else{
            this.transferData.curr=1;
            this.transferData.size=5;
            if(this.$refs.depCascader.getCheckedNodes().length>0){
              this.transferData.departId  = this.$refs.depCascader.getCheckedNodes()[0].value;
            }
            this.getTableData(this.transferData);
         }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.transferData.curr=1;
        this.transferData.size=5;
        this.getTableData();
      },
      //接收子组件分页的数据--刷新整个表格
      getPaginationMessage(message){
          this.transferData = message;
          this.getTableData();
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



  }
}

</script>

<style>
  @import "../../../../../less/layout.css";

  .tooltiptext{
    position: relative;
    top: -10px;
    right: -15px;
    font-size: 14px;
    color: #409EFF;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /* 后加 */

  .el-table thead.is-group th {
    background: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type {
    border-bottom: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-53deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
  .el-table thead.is-group tr:last-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0; 
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-54deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
    /* // background:red; */
  }


</style>
