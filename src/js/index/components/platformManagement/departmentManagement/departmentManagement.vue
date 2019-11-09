<template>
  <div>
      <div id="depManagement" class="layout">
        <el-card  class="box-card" >
          <div slot="header" class="clearfix">
            <span>部门列表</span>
          </div>
          <el-tree
            style="width:80%;margin: 0 auto;"
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span  style="font-size: 14px;">{{ node.label }}</span>
              <span>
                <!-- 部门类型 -->
                <span  v-if="data.departType==1" class="fontStyle depTypeStyle" title="部门类型">总</span>
                <span  v-if="data.departType==2" class="fontStyle depTypeStyle" title="部门类型">分</span>
                <span  v-if="data.departType==3" class="fontStyle depTypeStyle" title="部门类型">组</span>
                <span  v-if="data.departType==4" class="fontStyle depTypeStyle" title="部门类型">客</span>
                <!-- 部门等级 -->
                <span  class="fontStyle depTypeStyle leveloffset" title="部门等级">{{data.departLevel}}</span>
                <el-button
                  type="text"
                  @click="() => addChildDepartment(data)">
                  <i class="iconfont icon-jiahao fontStyle" style="font-size: 14px;color: #00CC00;"></i>
                </el-button>
                <el-button
                  type="text"
                  @click="() => editChildDepartment(node,data)">
                  <i class="iconfont icon-bianji1 fontStyle"></i>
                </el-button>
                <el-link style="color: #409EFF;"  :underline="false" @click="addPerson(data)">
                   <i class="iconfont icon-addbole fontStyle" style="margin-left: 10px;font-size:22px;"></i>
                </el-link>
                <!-- 展示部门下人员 -->
                <span style="padding-right: 10px; color: #3399FF;" class="fontStyle"  @click="showEmployeesView(data)" title="部门人数">({{data.num}})</span>
                <el-button
                  type="text"
                  @click="() => isDeleteDepartment(node, data)">
                    <i class="iconfont icon-chuyidong fontStyle" style="color: #FF0000;"></i>
                </el-button>
              </span>
            </span>
          </el-tree>
          <!-- 新增or编辑部门 dialog-->
          <el-dialog :title="dialogType=='edit'?'编辑部门':'添加部门'" :visible.sync="addDepartmentDialogVisible"  >
              <div style="width: 90%; margin: 0 auto;">
                  <el-form :model="addDepartmentForm" :rules="addDepartmentFormRules" ref="addDepartmentForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="部门名称:" prop="departName">
                        <el-input v-model="addDepartmentForm.departName"></el-input>
                      </el-form-item>
                      <el-form-item label="部门类型:" prop="departType">
                        <el-select v-model="addDepartmentForm.departType" placeholder="请选择" style="display: block;">
                            <el-option
                              v-for="item in departTypeOpts"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                      </el-form-item>
                     <el-form-item label="上级部门:" prop="panme">
                          <span  v-if="dialogType=='add'">{{addDepartmentForm.pname}}</span>
                          <span  v-if="dialogType=='edit'">{{addDepartmentForm.pname}}</span>
                      </el-form-item>
                  </el-form>

                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addOrUpdateDepartmentSubmit('addDepartmentForm')">确 定</el-button>
                    <el-button  @click="addDepartmentDialogVisible = false">取 消</el-button>
                  </div>
                  <div style="clear: both;"></div>
              </div>
          </el-dialog>

          <!-- 添加人员 dialog-->
          <el-dialog id="addPerson" title="添加人员" :visible.sync="addPersonDialogVisible"  >
              <div style="width: 90%; margin: 0 auto;">
                  <p style="margin-bottom: 15px;">部门名称: {{this.dialogdepname}}</p>
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

          <!-- 删除提示框-->
          <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="30%"
            >
            <span>{{this.deleteState.message}}</span>
            <div slot="footer">
              <el-button @click="deleteDialogVisible = false">取 消</el-button>
              <el-button v-if="this.deleteState.state==true" type="primary" @click="submitDelete" >确 定</el-button>
              <el-button v-if="this.deleteState.state==false" type="primary" @click="submitDelete" disabled>确 定</el-button>
            </div>
            <div style="clear: both;"></div>
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
                 @paginationMessage="getShowDepPaginationMessage"
              />
          </el-dialog>
        </el-card>
      </div>
  </div>
</template>

<script>
  let id = 1000;
  import pagination from '../../generalComponents/generalPagination.vue';
  import qs from 'qs'
  export default {
    components:{
      pagination:pagination,
    },
    data() {
      return {
        genUrl:'',//存放公共路径
        componentUrl:'/platformManagement/getformList',
        urls:{
          getDepartmentDataUrl:'/api/SysDepartController/getSysDepartAll', //获取部门信息-树形菜单
          addDepartmentUrl:'/api/SysDepartController/insertSysDepart',//添加部门
          updateDepartmentUrl:'/api/SysDepartController/updateSysDepart',//修改部门
          getAddPersonForDepartmentUrl:'/api/SysEmpController/getSysEmpListDepChose',//获取人员信息-为部门调整人员信息-穿梭框
          submitAddPersonForDepartmentUrl:'/api/SysEmpController/insertSysEmpDepart',//提交部门人员调整信息
          DeleteSysDepartUrl:'/api/SysDepartController/deleteSysDepart',//删除部门
          isDeleteSysDepartUrl:'/api/SysDepartController/isDeleteSysDepart', //判断是否可以删除
          showEmployeesViewDataUrl:'/api/SysEmpController/getSysEmpListIsChoice', //查看当前部门人员列表 ==后台为给==
        },
        //查看角色人员时想后台传输的分页数据
        empNumTransferData:{
          departId:'',
          curr:1,
          size:5,
          total:null,
        },
        depSwitchValue:true,
        data: [],
        prosonData:[],
        addPersons: [],
        deleteDialogVisible:false,
        addPersonDialogVisible:false,
        addDepartmentDialogVisible:false,
        employeesViewDialogVisible:false,
        formLabelWidth: '100px',
        departId:null,
        //添加或修改存放弹框表单的值
        addDepartmentForm: {
          departName: null,
          departType: null,
          departLevel:null,
          parentDepartId:null,
          pname:null,
          departId:null,
        },
        //添加或修改存放弹框表单值的验证规则
        addDepartmentFormRules: {
          departName: [
            { required: true, message: '请填写部门名称', trigger: 'blur' },
          ],
          departType: [
            { required: true, message: '请选择部门类型', trigger: 'blur' }
          ],
        },
        departTypeOpts:[
          {
            value: 0,
            label: '其他',
          },
          {
            value: 1,
            label: '总公司',
          },
          {
            value: 2,
            label: '分公司',
          },
          {
            value: 3,
            label: '班组',
          },
          {
            value: 4,
            label: '客服中心',
          },
        ],
        //树形菜单 选择当前行的值
        selectedDepartmentValue:{},
        showEmployeesData: [],
        pname:'',
        dialogType:"add",
        dialogdepname:'',
        deleteState:{
           state:false,
           message:''
        }
      }
    },
    created () {
        this.getTreeData();
    },


    methods: {
      //获取部门树形菜单数据
      getTreeData(){
         this.$ajax.post(this.urls.getDepartmentDataUrl,{},{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              if(res.data.status === 200) {
                  // 1）JSON.stringify()把json对象转成json字符串；
                  // 2）使用正则的replace()方法替换属性名；
                  // 3）JSON.parse()把json字符串又转成json对象。
                  this.data = JSON.parse(JSON.stringify(res.data.content).replace(/childList/g, 'children'));
                  this.data = JSON.parse(JSON.stringify(this.data).replace(/departName/g, 'label'));

              } else {
                  this.$notify.error({title: res.data.message});
              }
          }).catch(res => {
              this.loading = false;
              this.$notify.error({title: '请刷新重试'});
          })
      },
      //获取添加人员的穿梭框数据-start
      getAddPersonData(row){
          var functionId = document.getElementById('functionId').innerText;
          this.$ajax.post(this.urls.getAddPersonForDepartmentUrl,qs.stringify({"departId":row.departId,"functionId":functionId}),{
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

      // 添加人员
       addPerson(row) {
        this.getAddPersonData(row);
        this.dialogdepname = row.label;
        this.departId = row.departId;
        this.addPersonDialogVisible = true;
      },
      //添加人员提交
      addOrUpdateDialogSubmit(){
        var empIds='';
         this.addPersons.map(function(id){
            empIds += id+';';
         })
        var functionId = document.getElementById('functionId').innerText;
        this.$ajax.post(this.urls.submitAddPersonForDepartmentUrl,qs.stringify({"departId":this.departId,"empIds":empIds,"functionId":functionId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
             if(res.data.status === 200) {
                 this.addPersonDialogVisible = false;
                 this.getTreeData();
                 this.$notify.success({
                     title: res.data.message
                 });
             } else {
                 this.$notify.error({title: res.data.message});
             }
         }).catch(res => {
             this.loading = false;
             this.$notify.error({title: '请刷新重试'});
         })
      },
      // 添加人员-end


      //查看部门员工 --start
      showEmployeesView(row){
          // var depId={"departId":data.departId};
          if(row){
            this.empNumTransferData.departId = row.departId;
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
      //查看部门员工 --end

      //接收子组件分页的数据--刷新角色
      getShowDepPaginationMessage(message){
          // console.log(message)
          this.empNumTransferData = message;
          this.showEmployeesView();
      },
      // 新增下级部门-start
      addChildDepartment(data){
          this.dialogType="add";
          this.addDepartmentForm ={
            departName: '',
            departType: '',
            departLevel:data.departLevel,
            parentDepartId:data.departId,
            pname:data.label,
          }
          // console.log(this.addDepartmentForm)
          this.selectedDepartmentValue = data; //存取选中部门，
          this.addDepartmentDialogVisible = true;
      },
      // 编辑下级部门-start
      editChildDepartment(node,data){
          this.dialogType="edit";
          this.addDepartmentForm ={
            departName: data.label,
            departType: data.departType,
            departLevel:data.departLevel,
            parentDepartId:data.parentDepartId,
            departId:data.departId,
            pname:node.parent.data.label,
          }
          this.selectedDepartmentValue = data; //存取选中部门，
          this.addDepartmentDialogVisible = true;
      },
      // 编辑下级部门-end
      //提交
      addOrUpdateDepartmentSubmit(formName){
          var urls=this.dialogType=="edit"?this.urls.updateDepartmentUrl:this.urls.addDepartmentUrl
          var addChildDepartmentData=this.addDepartmentForm;
          this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$ajax.post(urls,qs.stringify(addChildDepartmentData),{
                  headers:{
                    'x-requested-with': 'XMLHttpRequest'
                  }}).then(res => {
                   if(res.data.status === 200) {
                      this.data = res.data.content;
                      this.getTreeData();
                      //----测试添加--------
                      // var data = this.selectedDepartmentValue;  //将输入的部门名称 存入选择部门的子部门
                      // const newChild = { id: id++, label: this.addDepartmentForm.departmentName, children: [] };
                      // if (!data.children) {
                      //   this.$set(data, 'children', []);
                      // }
                      // data.children.push(newChild);
                       //----测试添加--------
                      this.addDepartmentDialogVisible = false;
                   } else {
                       this.$notify.error({title: res.data.message});
                   }
               }).catch(res => {
                   this.loading = false;
                   this.$notify.error({title: '请刷新重试'});
               })
            } else {
              return false;
            }
          });
      },

      isDeleteDepartment(node, data) {
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      //   console.log(node, data);
      //   var munState=false;
      //   var childrenNodeState=false;
      //   if(data.num>0){
      //       alert("此部门已关联员工，不可删除!")
      //   }else{
      //       munState=true;
      //   }
      //
      //   if(data.children){
      //       alert("此部门已存在下级部门，不可删除!")
      //   }else{
      //       childrenNodeState=true;
      //   }
      //   if(munState&&childrenNodeState){
      //       console.log("提交")
      //   }else{
      //       console.log("完善信息")
      //   }

        // var id={depID:data.id}
        this.departId = data.departId;
        this.$ajax.post(this.urls.isDeleteSysDepartUrl,qs.stringify({"departId":this.departId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
              this.deleteState.message = res.data.message;
              this.deleteDialogVisible = true;
             if(res.data.status === 200) {
                this.deleteState.state = true;
             } else {
                this.deleteState.state = false;
             }
         }).catch(res => {
             this.$notify.error({title: '请刷新重试'});
         })
      },
      submitDelete(){
        this.$ajax.post(this.urls.DeleteSysDepartUrl,qs.stringify({"departId":this.departId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
             if(res.data.status === 200) {
                this.deleteDialogVisible = false;
                this.$notify.success({
                    title: res.data.message
                });
                this.getTreeData();
             } else {
                this.$notify.error({
                   title: res.data.message
               });
             }
         }).catch(res => {
             this.$notify.error({title: '请刷新重试'});
         })
      },
    }
  };
</script>

<style>
  @import "../../../../../less/layout.css";
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding-right: 8px;
    padding-bottom:5px ;
  }

  /*bymyself*/

  .el-transfer__buttons{
     padding:0 15px;
  }
  #depManagement .dialog-footer{
     float: right;
     margin: 25px 0px 0px 0px;
  }
  .el-transfer-panel__item{
     display: block;
  }

   #showEmployees .el-dialog{
      width: 800px;
	  min-height: 430px;
   }

  .fontStyle{
      font-size: 12px;
      margin-right: 10px;
  }
  .el-tree-node{
    padding-top: 5px;
  }

  .depTypeStyle{
     display: inline-block;
     width:18px;
     height: 18px;
     line-height: 18px;
     border-radius: 11px;
     padding-left: 3px;
     background-color: #FE714D;
     color: #FFFFFF;
  }

  .depLevelStyle{
      display: inline-block;
      width:15px;
      height: 15px;
      line-height: 15px;
      border-radius: 10px;
      padding-left: 3px;
      border: 1px solid #A24BA6;
      color:#A24BA6;
  }
  .leveloffset{
     padding-left: 5px;
  }

  .el-switch.is-checked .el-switch__core::after{
      margin-left: -13px;
  }

  .el-switch__core:after{
      width: 12px;
      height: 12px;
  }
  .el-switch__core{
      width: 30px;
      height: 17px;
      margin: 0px 10px;
  }

  /* 添加人员弹框 */
  div.el-dialog{
     width: 670px;
  }
  div.el-transfer-panel{
     width: 250px;
  }

  #depManagement .el-dialog__footer{
      border: 0;
  }

</style>
