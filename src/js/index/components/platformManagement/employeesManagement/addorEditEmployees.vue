<template>
  <div id="addEmp" class="layout">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工信息</span>
        <span style="float:right"><b style="color: red;">*</b>为必填项</span>
      </div>
      <!-- 左侧表单信息 -->
      <div style="width: 80%; margin: 0 auto;">
          <div id="addEmpForm" class="lf">
              <el-form :model="employeesInforForm" :rules="rules" ref="employeesInforForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="员工工号:" prop="empNo">
                  <template v-if="this.$route.query.type=='edit'">
                     <span>{{this.employeesInforForm.empNo}}</span>
                  </template>
                  <template v-else>
                     <el-input v-model="employeesInforForm.empNo"></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="员工姓名:" prop="empName">
                  <template v-if="this.$route.query.type=='edit'">
                     <span>{{this.employeesInforForm.empName}}</span>
                  </template>
                  <template v-else>
                     <el-input v-model="employeesInforForm.empName"></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="员工性别:" prop="empSex">
                    <el-radio v-model="employeesInforForm.empSex" label="M">男</el-radio>
                    <el-radio v-model="employeesInforForm.empSex" label="W">女</el-radio>
                </el-form-item>
                <el-form-item label="数据权限级别:" prop="empLevel">
                  <el-select v-model="employeesInforForm.empLevel" placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in empLevelOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码:" prop="empPhone">
                  <el-input v-model="employeesInforForm.empPhone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码:" prop="empPassword" >
                  <template v-if="this.$route.query.type=='edit'">
                    <el-input  type="password" v-model="employeesInforForm.empPassword"  style="width: 71%;"   placeholder="********" ></el-input>
                    <el-button v-if="this.$route.query.type=='edit'" style="width: 25%;"  @click.prevent="resetPassword()">重置密码</el-button>
                  </template>
                  <template v-else>
                    <el-input v-model="employeesInforForm.empPassword"   placeholder="请填写登录密码(不填写默认为员工工号)" ></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="备注:" prop="empNote">
                  <el-input  :autosize="{ minRows: 8, maxRows: 12}" placeholder="请输入备注信息" type="textarea" v-model="employeesInforForm.empNote"></el-input>
                </el-form-item>

              </el-form>
          </div>
          <!-- 右侧 -->
          <div id="sel_right" class="lf">
              <!-- 部门选择 -->
              <div>
                  <p style="margin-bottom: 20px;"><b style="color: red;">*</b>所属部门：</p>
                  <el-tree
                    style="margin-left:10px; height: 280px; overflow: auto;"
                    :data="deptreeData"
                    show-checkbox
                    node-key="departId"
                    :check-strictly=true
                    ref="tree"
                    :default-expand-all=true
                    :default-checked-keys="defaultDepCheckedkeys"
                    :props="defaultProps">
                  </el-tree>
              </div>
              <!-- 系统角色选择 -->
              <div>
                <p style="margin-top: 30px;margin-bottom: 20px;"><b style="color: red;">*</b>系统角色：</p>
                 <el-tree
                   style="margin-left:10px; height: 280px; overflow: auto;"
                   :data="sysRoleData"
                   show-checkbox
                   node-key="roleId"
                   ref="sysRole"
                   :default-expand-all=true
                   :default-checked-keys="defaultRoleCheckedkeys"
                   :props="defaultProps">
                 </el-tree>
              </div>
          </div>
          <div style="clear: both;"></div>
          <div style="width: 290px;margin: 40px auto;">
            <el-button style="padding:15px 50px;"  type="primary" @click="submitForm('employeesInforForm')">提交</el-button>
            <el-button  style="padding:15px 50px;"   type="primary" plain  @click="resetForm('employeesInforForm')">重置</el-button>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {validatePhone,validatePassWord,validateId} from "../../../../../utils/validation";
import qs from 'qs'
export default {
  data() {
    // var defaultCheckedkeys=this.$refs.tree.setCheckedKeys(['0','1'])
    return {
        urls:{
          getAddOrEditPageUrl:'/api/SysEmpController/getSysEmpById',
          addSubmitUrl:'/api/SysEmpController/addSysEmp',
          editSubmitUrl:'/api/SysEmpController/upadateSysEmp',
        },
        copyPassword:'',
        defaultDepCheckedkeys:[],
        defaultRoleCheckedkeys:[],
        deptreeData:[],
        sysRoleData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        empSexOpts:[
          {
            value: 'W',
            label: '女',
          },
          {
            value: 'M',
            label: '男',
          }
        ],
        empLevelOpts:[
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
          }
        ],
        employeesInforForm: {
          "empId": null,
          "empNo": "",
          "empName": "",
          "empPassword": "",
          "empSex": "",
          "empLevel": null,
          "empPhone": "",
          "empNote": "",
        },
        rules: {
          empNo: [
            { required: true, message: '请输入员工工号',trigger: 'blur'},
            { validator: validateId, trigger: 'blur' },
          ],
          empName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          empSex: [
            { required: true, message: '请输入员工性别', trigger: 'blur' }
          ],
          empLevel: [
            { required: true, message: '请选择一个数据权限级别', trigger: 'blur' }
          ],
          empPhone: [
            // { required: true, message: '请填写手机号码', trigger: 'change' },
            { validator: validatePhone, trigger: 'change' },
          ],
          empPassword: [
            // { required: true, message: '请填写手机号码', trigger: 'change' },
            { min: 8, max: 16, message: '密码长度在 8 到 16 位', trigger: 'change' },
            { validator: validatePassWord, trigger: 'change' },
          ],
        },

    };
  },
  created() {
      this.getTableData();
  },
  methods: {
      getTableData(){
        //获取部门数据
        this.$ajax.post(this.urls.getAddOrEditPageUrl,qs.stringify({"empId":this.$route.query.empId}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
             if(res.data.status === 200) {
                 this.deptreeData = JSON.parse(JSON.stringify(res.data.content.departList).replace(/childList/g, 'children'));
                 this.deptreeData = JSON.parse(JSON.stringify(this.deptreeData).replace(/departName/g, 'label'));
                 this.sysRoleData = JSON.parse(JSON.stringify(res.data.content.roleList).replace(/roleName/g, 'label'));
                 if(this.$route.query.type=='edit'){
                     this.employeesInforForm = res.data.content.sysEmpVo;
                     res.data.content.sysEmpVo.empPassword = null;
                     this.copyPassword = res.data.content.sysEmpVo.empNo;

                     for(var i=0;i<res.data.content.departListChose.length;i++){
                       this.defaultDepCheckedkeys.push(res.data.content.departListChose[i].departId);
                     }

                     for(var j=0;j<res.data.content.roleListChose.length;j++){
                       this.defaultRoleCheckedkeys.push(res.data.content.roleListChose[j].roleId);
                     }
                     //
                     // this.defaultDepCheckedkeys=[2,3];//等待接口
                     // this.defaultRoleCheckedkeys=[2];//等待接口
                 }else{
                     this.employeesInforForm.empSex = 'M';
                 }
                 // console.log(this.employeesInforForm);
             } else {
                 this.$notify.error({title: res.data.message});
             }
         }).catch(res => {
             this.$notify.error({title: '请刷新重试'});
         })
      },
      //密码重置按钮，重置回原始带的值
      resetPassword(){
        this.employeesInforForm.empPassword = this.copyPassword;
        // console.log(this.employeesInforForm.empPassword)
      },
      submitForm(formName) {
        if((this.$refs.tree.getCheckedKeys().length<=0)||(this.$refs.sysRole.getCheckedKeys().length<=0)){
           this.$notify.error("请完善信息");
        }else{
          var departs= this.$refs.tree.getCheckedKeys().join(";");
          var roles=this.$refs.sysRole.getCheckedKeys().join(";");
          var urls = this.$route.query.type=='edit'?this.urls.editSubmitUrl:this.urls.addSubmitUrl;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$ajax.post(urls,qs.stringify({"departs":departs,"roles":roles,...this.employeesInforForm}),{
              headers:{
                'x-requested-with': 'XMLHttpRequest'
              }}).then(res => {
                   if(res.data.status === 200) {
                      this.$notify.success({title: res.data.message});
                      this.$router.push("/platformManagement/employeesManagement");
                   } else {
                       this.$notify.error({title: res.data.message});
                   }
              }).catch(res => {
                   this.$notify.error({title: '请刷新重试'});
              })
            } else {
              this.$notify.error({title: '请完善信息'});
              return false;
            }
          });
        }
      },

      //重置
      resetForm(formName) {
          if(this.$route.query.type=='edit'){
             this.getTableData();
          }else{
             this.$refs[formName].resetFields();
          }
          this.$refs.tree.setCheckedKeys(this.defaultDepCheckedkeys);
          this.$refs.sysRole.setCheckedKeys(this.defaultRoleCheckedkeys);
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
    clear: both;
  }
  /* by jxw */
  .lf{
    float: left;
  }
  #addEmpForm{
    width: 55%;
    margin-right: 4%;
  }
  #addEmpForm .el-form-item{
    margin-bottom: 40px;
  }
  #sel_right{
    width: 40%;
  }


  .width77{
     width: 77%;
  }

  .width100{
     width: 100%;
  }


</style>
