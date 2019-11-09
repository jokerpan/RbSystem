<template>
    <div id="roleManagement" class="layout">
        <!-- 表单-数据筛选 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>数据筛选</span>
            </div>
            <el-form :inline="true" :model="transferData"  ref="transferData" label-width="100px" class="demo-ruleForm" id="searchData">
              <el-form-item label="输入查询" prop="roleName">
                <el-input v-model="transferData.roleName" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item label="启用状态"  prop="roleState" >
                <el-select v-model="transferData.roleState" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启动" value="1"></el-option>
                    <el-option label="停用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="search('transferData')"><i class="iconfont icon-sousuo"></i> 查询</el-button>
                <el-button size="small" @click="resetForm('transferData')"><i class="iconfont icon-zhongzhi"></i>重置</el-button>
              </el-form-item>
            </el-form>
        </el-card>
        <!-- 数据列表---table -->
        <el-card class="box-card topGutter" >
           <div slot="header" class="clearfix">
             <span>数据列表</span>
             <el-button size="small" style="float: right;"  id="addButton"  @click="showAddModal()" type="primary"><i class="iconfont icon-tianjia"></i>&nbsp;新增角色</el-button>
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
               prop="roleDate"
               label="更新时间"
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

             <el-table-column
               prop="roleState"
               label="启用状态"
               >
                <template slot-scope="scope">
                   <template v-if="scope.row.roleState==2">
                      <span>—</span>
                   </template>
                   <template v-else>
                      <el-switch
                         v-model="scope.row.roleState==1?vtrue:vfalse"
                         active-color="#13ce66"
                         @change="changeUseState(scope.row)"
                         inactive-color="#ff4949">
                      </el-switch>
                   </template>
                </template>
             </el-table-column>
             <el-table-column label="操作" width="400">
               <template slot-scope="scope">
                  <el-link  v-if="scope.row.roleState!=2" style="margin-left: 5px; color: #409EFF;"  :underline="false" @click="roleRightsSetting(scope.$index, scope.row)">
                      <i class="iconfont icon-shezhi2"></i> 权限设置
                  </el-link>
                  <el-link style="margin-left: 10px; color: #409EFF;" :underline="false" @click="showEditModal(scope.$index, scope.row)">
                      <i class="iconfont icon-bianji"></i> 编辑
                  </el-link>
                   <el-link v-if="scope.row.roleState!=2" style="margin-left: 5px; color: #409EFF;"  :underline="false" @click="deleteRole(scope.$index, scope.row)">
                     <i class="iconfont icon-chuyidong"></i> 删除
                  </el-link>
               </template>
             </el-table-column>
           </el-table>
           <pagination
              v-bind:message="transferData"
              v-bind:urls="this.urls.getSystemRoleTableUrl"
              @paginationMessage="getPaginationMessage"
           />
        </el-card>
        <!-- 新增角色弹框dialog -->
        <el-dialog  :title="dialogType=='edit'?'修改角色':'新增角色'"  :visible.sync="addRoleDialogVisible">
          <el-form :model="dialogData" ref="dialogData"  :rules="dialogFormRules">
            <el-form-item label="角色名称" :label-width="formLabelWidth"  prop="roleName">
              <el-input v-model="dialogData.roleName" ></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth"  prop="roleNote">
              <el-input type="textarea"  v-model="dialogData.roleNote"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addOrUpdateDialogSubmit()">确 定</el-button>
            <el-button @click="addRoleDialogVisible = false">取 消</el-button>
          </div>
        </el-dialog>
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
    </div>
</template>

<script>
import pagination from '../../generalComponents/generalPagination.vue';
import qs from 'qs'
export default {
  components:{pagination},  //组件化
  data() {
      return {
        vtrue:true,
        vfalse:false,
        urls:{
           getSystemRoleTableUrl:'/api/SysRoleController/getSysRoleList',
           selectFormUrl:'/api/SysRoleController/getSysRoleList',
           addRoleUrl:'/api/SysRoleController/insertSysRole',
           updateRoleUrl:'/api/SysRoleController/updateSysRole',
           showEmployeesViewDataUrl:'/api/SysEmpController/getSysRoleListIsChoice',
           useStateUrl:'/api/SysRoleController/deleteSysRole',
           deleteRoleUrl:'/api/SysRoleController/deleteSysRole',
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
        value: [],
        addPersonDialogVisible:false,
        addRoleDialogVisible: false,
        employeesViewDialogVisible:false,
        formLabelWidth: '100px',
        tableData: [],
        showEmployeesData:[],
        selectForm: {
          name:'',
          state:'',
        },
        dialogData:{
          roleName:null,
          roleNote:null,
          roleId:null,
        },
        dialogType:"add",
        dialogFormRules:{
          roleName:[{ required: true, message: '请填写角色名称', trigger: 'blur' }],
        },

      };
  },
  created () {
      this.getTableData();
  },
  methods: {
        //获取表单数据
        getTableData(){
           this.transferData.total = null;
           this.$ajax.post(this.urls.getSystemRoleTableUrl,qs.stringify(this.transferData),{
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
        //搜索，提交表单数据
        search(formName) {
          // var formData = JSON.stringify(this.ruleForm);
          if(this.transferData.roleName==null&&this.transferData.roleState==null){
             this.$message({
               message: '请输入查询条件！',
               type: 'warning'
             });
          }else{
              this.transferData.curr=1;
              this.transferData.size=5;
              this.transferData.total = null;

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

      changeUseState(row){
        this.$alert('确定要停用该角色吗？', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            row.roleState = 1^row.roleState;
            this.$ajax.post(this.urls.useStateUrl,qs.stringify(row),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                if (res.data.status ===200) {
                    this.$notify.success({
                        title: res.data.message
                    });
                    this.getTableData();
                } else {
                    this.$notify.error({
                        title: res.data.message
                    });
                    this.getTableData();
                }
            }).catch(res => {
                this.$message.error('请刷新重试');
            })
          }
        });
      },
      //添加数据
      showAddModal(){
        this.dialogType="add";
        this.dialogData={
          roleName:'',
          roleNote:''
        }
        this.addRoleDialogVisible = true;
      },
      showEditModal(index,row){
        this.dialogType="edit";
        this.dialogData={
           roleId:row.roleId,
           roleName:row.roleName,
           roleNote:row.roleNote
        }
        this.addRoleDialogVisible = true;
      },


      //提交弹出框数据
      addOrUpdateDialogSubmit(){
        // var dialogData=JSON.stringify(this.dialogData); //将数据变成字符串
        var urls=this.dialogType=="edit"?this.urls.updateRoleUrl:this.urls.addRoleUrl
        this.$refs.dialogData.validate(valid => {
            if (valid) {
                this.$ajax.post(urls, qs.stringify(this.dialogData),{
                  headers:{
                    'x-requested-with': 'XMLHttpRequest'
                  }}).then(res => {
                    if (res.data.status === 200) {
                        this.addRoleDialogVisible=false;
                        //清空表单
                        this.$nextTick(() => {
                           this.$refs['dialogData'].resetFields()
                        })
                        this.getTableData();
                        this.$notify.success({
                            title: res.data.message
                        });
                    } else {
                        this.$notify.error({
                            title: res.data.message
                        });
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            } else {
                return false;
            }
        })
      },
      //删除角色
      deleteRole(index, row) {
        this.$confirm('是否删除该角色?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post(this.urls.deleteRoleUrl,qs.stringify({'roleId':row.roleId,'roleState':2}),{
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //设置权限
      roleRightsSetting(index,row){
        this.$router.push({
           path:"/platformManagement/funcRightsSetting",
           query:{
             id:row.roleId,
             name:row.roleName,
           }
        });

      },
      //查看
      showEmployeesView(index,row){
          if(row){
            this.empNumTransferData.roleId = row.roleId;
          }
          this.empNumTransferData.total = null; //每次点击tatal设置成null
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
      }

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

 .el-dialog {
    width: 40%;
    min-height: 240px;
  }

  .el-dialog__footer{
    border-top: 1px solid #ddd;
  }
  .el-dialog__header{
    border-bottom: 1px solid #ddd;
  }

    /* 查看人员 */
  #showEmployees .el-dialog{
     width: 800px;
  	  min-height: 430px;
  }

</style>
